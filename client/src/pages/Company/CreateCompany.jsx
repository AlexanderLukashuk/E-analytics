import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
    const [companyData, setCompanyData] = useState({
        name: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/forbidden');
        } else {
            fetch('http://localhost:8080/api/auth/check-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.status !== 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate('/forbidden');
                }
            }).catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/forbidden');
            });
        }
    }, [navigate]);

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

            if (response.status === 403) {
                navigate('/forbidden');
            } else if (response.ok) {
                console.log('Company created successfully!');
                navigate('/company');
            } else {
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.message);
            }
        } catch (error) {
            console.error('Error creating company:', error);
            setErrorMessage('An error occurred. Please try again.');
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