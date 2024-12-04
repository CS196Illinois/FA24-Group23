import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, correctAnswers, totalLogos } = location.state || {};

  const handlePlayAgain = () => {
    navigate('/'); // Navigate back to categories or the start of the game
  };

  return (
    <div>
      <h1>Game Results</h1>
      <p>Your total score: {score}</p>
      <p>Correct answers: {correctAnswers} out of {totalLogos}</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default Results;
