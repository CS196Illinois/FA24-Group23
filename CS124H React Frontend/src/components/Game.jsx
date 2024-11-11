import React, { useState } from 'react';
import '../Game.css'; // Optional: Add a custom CSS file for styling

const Game = () => {
    // State to store the user input
    const [userInput, setUserInput] = useState('');

    // Placeholder for the image URL (you can update this with dynamic content)
    const imageUrl = 'https://via.placeholder.com/150'; // Example placeholder image

    // Handle input change
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <div className="game-container">
            {/* Image Container */}
            <div className="logo-display">
                <img
                    src={imageUrl}
                    alt="Logo"
                    style={{ width: 150, height: 150 }}
                />
            </div>

            {/* Input Box */}
            <div className="answer-input">
                <input
                    type="text"
                    placeholder="Enter your answer"
                    value={userInput}
                    onChange={handleInputChange}
                    className="input-box"
                />
            </div>
        </div>
    );
};

export default Game;