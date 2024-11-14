import React, { useState, useEffect } from 'react';

const Categories1 = () => {
  const [colleges, setColleges] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sports, setSports] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch College data
    fetch('http://localhost:5000/Categories/College')
      .then((response) => response.json())
      .then((data) => setColleges(data))
      .catch((error) => console.error('Error fetching colleges:', error));

    // Fetch Company data
    fetch('http://localhost:5000/Categories/Company')
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error('Error fetching companies:', error));

    // Fetch Sports data
    fetch('http://localhost:5000/Categories/Sports')
      .then((response) => response.json())
      .then((data) => setSports(data))
      .catch((error) => console.error('Error fetching sports:', error));
  }, []);

  return (
    <div>
      <h1>Categories</h1>

      {/* Colleges Section */}
      <section>
        <h2>Colleges</h2>
        <ul>
          {colleges.map((college) => (
            <li key={college._id}>
              <h3>{college.name}</h3>
              {/* Render SVG content */}
              <div dangerouslySetInnerHTML={{ __html: college.file }}></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Companies Section */}
      <section>
        <h2>Companies</h2>
        <ul>
          {companies.map((company) => (
            <li key={company._id}>
              <h3>{company.name}</h3>
              {/* Render SVG content */}
              <div dangerouslySetInnerHTML={{ __html: company.file }}></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Sports Section */}
      <section>
        <h2>Sports</h2>
        <ul>
          {sports.map((sport) => (
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

export default Categories1;