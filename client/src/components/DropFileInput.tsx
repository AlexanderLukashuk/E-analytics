import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./drop-file-input.css";
import { Button } from "./index.jsx";
import { ImageConfig } from "../config/ImageConfig.js";
import uploadImg from "../assets/cloud-upload-regular-240.png";
import { useStateContext } from "../contexts/ContextProvider.js";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);
  const [file, setFile] = useState(null);

  const { currentColor } = useStateContext();

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFile(e.target.files[0]);
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
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/companies/${companyId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("File successfully uploaded.");
    } catch (error) {
      console.error("Error during uploading file:", error);
      alert("Error during uploading file. Please, try again.");
    }
  };
  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
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
          <Button
            color="white"
            bgColor={currentColor}
            text="Upload data"
            borderRadius="10px"
            onClick={handleUpload}
          />
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DropFileInput;
