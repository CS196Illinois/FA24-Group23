import React, { useState, useEffect } from 'react';

const Categories1 = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend API
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <h2>{category.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: category.file }}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories1;