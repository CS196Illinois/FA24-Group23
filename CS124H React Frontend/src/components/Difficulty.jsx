import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Difficulty.css';

const Difficulty = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category || 'Category';

    // State to store selected difficulty
    const [difficulty, setDifficulty] = useState('');

    // Handle difficulty selection
    const handleDifficultyClick = (level) => {
        setDifficulty(level);
    };

    // Navigate to Game page with selected category and difficulty
    const handleBegin = () => {
        if (difficulty) {
            navigate('/game', { state: { category, difficulty } });
        } else {
            alert('Please select a difficulty level before starting.');
        }
    };

    return (
        <div className="difficulty-container">
            <div className="gear-icon">&#9881;</div>
            <h1>{category}</h1>
            <h2>Select Difficulty</h2>
            <div className="difficulty-options">
                <button 
                    className={`difficulty-button ${difficulty === 'Easy' ? 'selected' : ''}`} 
                    onClick={() => handleDifficultyClick('Easy')}
                >
                    Easy
                </button>
                <button 
                    className={`difficulty-button ${difficulty === 'Medium' ? 'selected' : ''}`} 
                    onClick={() => handleDifficultyClick('Medium')}
                >
                    Medium
                </button>
                <button 
                    className={`difficulty-button ${difficulty === 'Hard' ? 'selected' : ''}`} 
                    onClick={() => handleDifficultyClick('Hard')}
                >
                    Hard
                </button>
            </div>
            <button className="begin-button" onClick={handleBegin}>
                &#9654; Begin
            </button>
            <div className="how-to-play">How to Play</div>
        </div>
    );
};

export default Difficulty;