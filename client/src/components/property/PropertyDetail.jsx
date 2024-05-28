import React, { useState, useEffect } from 'react';

function PropertyDetail({ propertyId }) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/properties/${propertyId}`)
      .then(response => response.json())
      .then(data => setProperty(data))
      .catch(error => console.error('Error fetching property:', error));
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Property Detail</h1>
      <p>Title: {property.title}</p>
      {/* Another fields to display property's details */}
    </div>
  );
}

export default PropertyDetail;
