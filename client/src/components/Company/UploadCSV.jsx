import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = ({ companyId }) => {
    const [file, setFile] = useState(null);

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
        } catch (error) {
            console.error('Error during uploading file:', error);
            alert('Error during uploading file. Please, try again.');
        }
    };

    return (
        <div>
            <h2>Upload Your Company Data</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadCSV;
