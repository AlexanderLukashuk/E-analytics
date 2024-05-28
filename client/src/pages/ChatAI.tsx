import React, { useState, useRef } from "react";
import { Header } from "../components/index.jsx";
import { useStateContext } from "../contexts/ContextProvider.js";
import "../components/drop-file-input.css";
import { Button } from "../components/index.jsx";
import { ImageConfig } from "../config/ImageConfig.js";
import uploadImg from "../assets/cloud-upload-regular-240.png";
import { Loader } from "../components/layout/Loader.jsx";

const ChatAI = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState();
  const [result, setResult] = useState();
  const [showChat, setShowChat] = useState(false);
  const wrapperRef = useRef(null);
  const [loading, setLoading] = React.useState(false);

  const { currentColor } = useStateContext();

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
      props.onSubmit(newFile);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };
  const handleQuestionChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    fetch("http://localhost:5000/upload_csv", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "File uploaded!", sender: "bot" },
        ]);
        setFile(null);
        setShowChat(true);
      })
      .catch((error) => {
        console.error("Ошибка", error);
      });
  };

  const handleAskQuestion = async (event) => {
    event.preventDefault();
    const userMessage = { text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/ask_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      setResult(data.response);
      const botMessages = [
        { text: "Question: " + inputText, sender: "bot" },
        { text: "Answer: " + data.response, sender: "bot" },
      ];
      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Chat AI" />
      {!showChat && (
        <>
          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onChange={handleFileChange}
          >
            <div className="drop-file-input__label">
              <img src={uploadImg} alt="" />
              <p>Drag & Drop your files here</p>
            </div>
            <input type="file" value="" accept=".csv" onChange={onFileDrop} />
          </div>
          {fileList.length > 0 ? (
            <div className="drop-file-preview">
              <p className="drop-file-preview__title">Ready to upload</p>
              {fileList.map((item, index) => (
                <div key={index} className="drop-file-preview__item">
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                  />
                  <div className="drop-file-preview__item__info">
                    <p>{item.name}</p>
                    <p>{item.size}B</p>
                  </div>
                  <span
                    className="drop-file-preview__item__del"
                    onClick={() => fileRemove(item)}
                  >
                    x
                  </span>
                </div>
              ))}
              <button
                onClick={handleSubmitFile}
                className="send-button"
                type="button"
              >
                Upload data
              </button>
            </div>
          ) : null}
        </>
      )}
      {showChat && (
        <>
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleAskQuestion} className="chat-form">
              <input
                type="text"
                value={inputText}
                onChange={handleQuestionChange}
                placeholder="Enter your request..."
                className="chat-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
            {loading && <Loader />}
          </div>
        </>
      )}
    </div>
  );
};
export default ChatAI;
