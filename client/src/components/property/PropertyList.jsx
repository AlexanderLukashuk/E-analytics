import React, { useState, useEffect } from 'react';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/properties')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  return (
    <div>
      <h1>Property List</h1>
      <ul>
        {properties.map(property => (
          <li key={property._id}>{property.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
