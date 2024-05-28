import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isValidToken, setIsValidToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsValidToken(false);
        } else {
            fetch('http://localhost:8080/api/auth/check-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.status === 200) {
                    setIsValidToken(true);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    setIsValidToken(false);
                }
            }).catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setIsValidToken(false);
            });
        }
    }, []);

    if (isValidToken === null) {
        return <div>Loading...</div>;
    }

    return isValidToken ? children : <Navigate to="/forbidden" />;
};

export default ProtectedRoute;