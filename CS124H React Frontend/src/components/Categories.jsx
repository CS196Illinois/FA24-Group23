import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../Categories.css';

const Categories = () => {
  const [collectionsData, setCollectionsData] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  // Fetch all collections and their data when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/collections')
      .then((response) => response.json())
      .then((data) => setCollectionsData(data))
      .catch((error) => console.error('Error fetching collections:', error));
  }, []);

  // Function to handle button click and navigate to Game.jsx with category data
  const handleCategoryClick = (categoryType) => {
    navigate(`/game/${categoryType}`, { state: { logos: collectionsData[categoryType] } }); // Pass logos as state
  };

  return (
    <div>
      <h1>Select a Category</h1>

      {/* Render buttons dynamically based on fetched collections */}
      <section>
        {Object.keys(collectionsData).map((collectionName) => (
          <button key={collectionName} onClick={() => handleCategoryClick(collectionName)}>
            {collectionName}
          </button>
        ))}
      </section>
    </div>
  );
};

export default Categories;