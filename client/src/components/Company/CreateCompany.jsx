import React, { useState } from 'react';

const CreateCompany = () => {
    const [companyData, setCompanyData] = useState({
        name: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            console.log('TOKEN = ', token);
            console.log('USER ID = ', userId);

            const companyDataWithOwnerId = {
                ...companyData,
                ownerId: userId
              };
            const response = await fetch('http://localhost:8080/api/companies/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(companyDataWithOwnerId)
            });
            if (response.ok) {
                console.log('Company created successfully!');
            } else {
                console.log('Failed to create company');
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.message);
            }
        } catch (error) {
            console.error('Error during company creation:', error);
        }
    };

    return (
        <div>
            <h2>Create Company</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={companyData.name} onChange={handleChange} required />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateCompany;
