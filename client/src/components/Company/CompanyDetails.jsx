import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/companies/${companyId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCompany(data);
        } else {
          console.error('Failed to fetch company');
        }
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{company.name}</h2>
      <p>Industry: {company.industry}</p>
      {/* Добавьте другие поля компании, которые вы хотите отобразить */}
    </div>
  );
};

export default CompanyDetails;
