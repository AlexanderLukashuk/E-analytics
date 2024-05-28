import React from 'react';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">403 Forbidden</h1>
            <p className="mb-4">You must log in or register to access this page.</p>
            <div>
                <button
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => navigate('/signin')}
                >
                    Login
                </button>
                <button
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => navigate('/signup')}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Forbidden;