import React, { useEffect, useState } from 'react';

const Logos = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    console.log('Fetching logos from backend...'); // Log before fetching data

    // Fetch logos from the backend API
    fetch('http://localhost:5000/api/logos')
      .then((response) => response.json())
      .then((data) => {
        console.log('Logos fetched:', data); // Log fetched data
        setLogos(data);
      })
      .catch((error) => {
        console.error('Error fetching logos:', error); // Log any errors
      });
  }, []);

  return (
    <div>
      <h1>Logo List</h1>
      <div className="logo-grid">
        {logos.map((logo) => (
          <div key={logo._id} className="logo-item">
            <img src={logo.imageUrl} alt={logo.name} />
            <p>{logo.name}</p>
            <p>Category: {logo.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logos;