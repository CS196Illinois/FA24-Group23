import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState(["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"]);
    const [newCategory, setNewCategory] = useState('');
    const [logos, setLogos] = useState([]);
    const navigate = useNavigate();

    const handleCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };

    const fetchLogos = async (query) => {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=YOUR_UNSPLASH_API_KEY`);
            const data = await response.json();

            return data.results.map((item) => ({
                name: item.alt_description || query,
                logo: item.urls.thumb,
            }));
        } catch (error) {
            console.error("Error fetching logos:", error);
            return [];
        }
    };

    const handleSearch = async () => {
        if (newCategory.trim()) {
            const result = await fetchLogos(newCategory);
            setLogos(result);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const goToDifficulty = (category) => {
        navigate('/difficulty', { state: { category } });
    };

    return (
        <div className="categories-container">
            <div className="gear-icon">&#9881;</div>
            <h1>Categories</h1>
            <div className="categories-box">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Create your own category..."
                        value={newCategory}
                        onChange={handleCategoryChange}
                        onKeyDown={handleKeyDown}
                        className="category-input"
                    />
                    <button onClick={handleSearch} className="search-button">
                        &#128269;
                    </button>
                </div>

                {categories.map((category, index) => (
                    <button key={index} className="category-button" onClick={() => goToDifficulty(category)}>
                        {category}
                    </button>
                ))}

                <div className="logos-container">
                    {logos.map((logo, index) => (
                        <div key={index} className="logo-item">
                            <img src={logo.logo} alt={`${logo.name} logo`} />
                            <span>{logo.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
