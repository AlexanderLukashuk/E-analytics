import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadCSV = ({ companyId }) => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/companies/${companyId}/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('File successfully uploaded.');
            navigate('/company');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                navigate('/forbidden');
            } else {
                console.error('Error during uploading file:', error);
                alert('Error during uploading file. Please, try again.');
            }
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <h2>Upload Your Company Data</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadCSV;