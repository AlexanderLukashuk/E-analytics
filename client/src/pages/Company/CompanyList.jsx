import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/companies', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        } else {
          console.error('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h2>My Companies</h2>
      <ul>
        {companies.map(company => (
          <li key={company._id}>
            <Link to={`/companies/${company._id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create-company">Create Company</Link>
    </div>
  );
};

export default CompanyList;