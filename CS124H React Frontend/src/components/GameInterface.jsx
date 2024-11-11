import React from 'react';
import { useNavigate } from 'react-router-dom';


const GameInterface = () => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate('/categories');
    };

    return (
        <div className="game-container">
            <div className="header">
                <div className="settings-icon">&#9881;</div> {/* Gear Icon */}
            </div>
            <div className="content">
                <h1 className="game-title">Guess The Logo</h1>
                <div className="buttons">
                    <button onClick={handlePlayClick} className="play-button">
                        <span>Play</span> &#9654; {/* Play Icon */}
                    </button>
                    <button onClick={() => console.log('Login button clicked')} className="login-button">Login</button>
                </div>
            </div>
            <div className="sidebar">
                <h2>Achievements</h2>
            </div>
        </div>
    );
};

export default GameInterface;

