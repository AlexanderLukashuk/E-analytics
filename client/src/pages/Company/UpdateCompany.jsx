import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateCompany = () => {
    const { id } = useParams();
    const [companyData, setCompanyData] = useState({ name: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/companies/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCompanyData(response.data);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanyData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/companies/${id}`, companyData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/company');
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <h1 className="text-2xl font-bold mb-4">Update Company</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={companyData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                >
                    Update Company
                </button>
            </form>
        </div>
    );
};

export default UpdateCompany;