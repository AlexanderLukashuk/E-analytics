import React, { useState } from 'react';

function CreatePropertyForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // TODO: Another fields for form

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Login for send request on the server to create property
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      {/* Another fields for form */}
      <button type="submit">Create Property</button>
    </form>
  );
}

export default CreatePropertyForm;
