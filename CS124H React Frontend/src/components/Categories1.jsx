import React, { useState, useEffect } from 'react';
// import './Categories.css'; // Assuming you have a CSS file for styling

const Categories = () => {
  const [data, setData] = useState({
    colleges: [],
    companies: [],
    sports: [],
  });

  useEffect(() => {
    // Fetch categories from backend API
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <h1>All Categories</h1>

      {/* Colleges */}
      <section>
        <h2>Colleges</h2>
        <ul>
          {data.colleges.map((college) => (
            <li key={college._id}>
              <h3>{college.name}</h3>
              {/* Render SVG content */}
              <div dangerouslySetInnerHTML={{ __html: college.file }}></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Companies */}
      <section>
        <h2>Companies</h2>
        <ul>
          {data.companies.map((company) => (
            <li key={company._id}>
              <h3>{company.name}</h3>
              {/* Render SVG content */}
              <div dangerouslySetInnerHTML={{ __html: company.file }}></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Sports */}
      <section>
        <h2>Sports</h2>
        <ul>
          {data.sports.map((sport) => (
            <li key={sport._id}>
              <h3>{sport.name}</h3>
              {/* Render SVG content */}
              <div dangerouslySetInnerHTML={{ __html: sport.file }}></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Categories;