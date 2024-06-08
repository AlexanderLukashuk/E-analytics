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
            fetch('https://eanalytics.fly.dev/api/auth/check-token', {
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
            const response = await fetch('https://eanalytics.fly.dev/api/companies/create', {
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
                console.log('Компания успешно создана!');
                navigate('/company');
            } else {
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.message);
            }
        } catch (error) {
            console.error('Ошибка при создании компании:', error);
            setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5"> Create Company</h2>
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Enter the name of the company:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        value={companyData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCompany;
