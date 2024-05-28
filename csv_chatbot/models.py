from transformers import AutoModelForCausalLM
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import CTransformers
from langchain.chains import ConversationalRetrievalChain

app = Flask(__name__)
CORS(app)
DB_FAISS_PATH = "vectorstore/db_faiss"
TEMP_DIR = "temp"

if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)

embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2', model_kwargs={'device': 'cpu'})
llm = CTransformers(model="models/chat.bin",
                    model_type="llama",
                    config={'max_new_tokens': 512, 'temperature': 0.01},
                    device_map='auto',
                    local_files_only=True,
                    verbose=True)

uploaded_data = None

@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    global uploaded_data
    global embeddings
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        file_path = os.path.join(TEMP_DIR, uploaded_file.filename)
        uploaded_file.save(file_path)
        loader = CSVLoader(file_path=file_path, encoding="utf-8", csv_args={'delimiter': ','})
        data = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=20)      
        text_chunks = text_splitter.split_documents(data)
        uploaded_data = text_chunks
        return jsonify({"message": "File uploaded successfully!"}), 200
    else:
        return jsonify({"error": "No file selected!"}), 400

@app.route('/ask_question', methods=['POST'])
def ask_question():
    global uploaded_data
    global embeddings
    query = request.json['question']
    chat_history = []
    print("huh")
    if uploaded_data is None:
        return jsonify({"error": "Data not uploaded!"}), 400
    else:
        docsearch = FAISS.from_documents(uploaded_data, embeddings)
        qa = ConversationalRetrievalChain.from_llm(llm, retriever=docsearch.as_retriever())
        result = qa.invoke({"question": query, "chat_history": chat_history})  # Используем invoke вместо __call__
        return jsonify({"response": result['answer']}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
