import tempfile
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import CTransformers
from langchain.chains import ConversationalRetrievalChain
from flask import Flask, request, jsonify
from llama_cpp import Llama

app = Flask(__name__)

DB_FAISS_PATH = 'vectorstore/db_faiss'

# Загрузка модели LLM
def load_llm():
    # Загрузка модели, скачанной локально
    llm=Llama(model_path="./llama.cpp/models/llama-2-7b-chat.Q4_K_M.gguf")

    return llm

# Обработчик для чата
def conversational_chat(query, chain):
    result = chain({"question": query, "chat_history": []})
    return result["answer"]

# Путь для обработки POST-запросов
@app.route('/predict', methods=['POST'])
def predict():
    # Получение загруженного CSV файла из запроса
    uploaded_file = request.files['file']
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        tmp_file.write(uploaded_file.read())
        tmp_file_path = tmp_file.name

    # Загрузка данных из CSV
    loader = CSVLoader(file_path=tmp_file_path, encoding="utf-8", csv_args={'delimiter': ','})
    data = loader.load()

    # Создание векторного хранилища
    embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2', model_kwargs={'device': 'cpu'})
    db = FAISS.from_documents(data, embeddings)
    db.save_local(DB_FAISS_PATH)

    # Загрузка модели LLM и создание цепочки
    llm = load_llm()
    chain = ConversationalRetrievalChain.from_llm(llm=llm, retriever=db.as_retriever())

    # Получение текстового запроса
    query = request.form['query']
    # Обработка запроса
    response = conversational_chat(query, chain)

    # Удаление временного файла CSV
    tmp_file.close()
    
    # Возвращение ответа в формате JSON
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
