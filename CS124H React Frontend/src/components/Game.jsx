import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Game.css";
import LogoComponent from "../components/Logo";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logos = location.state?.logos || [];
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [score, setScore] = useState(50);
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [userGuess, setUserGuess] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [randomLogos, setRandomLogos] = useState([]); // Generates n logos for user to guess
  const [isCorrect, setIsCorrect] = useState(false);
  const [guessChange, setGuessChange] = useState("");

  const currentLogo = randomLogos[currentLogoIndex] || {};

  useEffect(() => {
    // Reset game state if no logos available
    if (logos.length === 0) {
      navigate("/");
    }

    // Generate random logos
    const genRandomLogos = new Array(5);
    for (let i = 0; i < genRandomLogos.length; i++) {
      genRandomLogos[i] = logos[Math.floor(Math.random() * logos.length)];
    }
    setRandomLogos(genRandomLogos);
  }, [logos, navigate]);

  const handleGuess = () => {
    if (
      userGuess.trim().toLowerCase() ===
      currentLogo.name.slice(0, -4).trim().toLowerCase()
    ) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev); // Score remains the same for correct guess
      setGuessesLeft(5); // Reset guesses for next logo

      setIsCorrect(true); // Animate logo
      setTimeout(() => {
        if (currentLogoIndex < randomLogos.length - 1) {
          setCurrentLogoIndex((prev) => prev + 1); // Move to next logo
        } else {
          // Game over, navigate to Results page
          navigate("/results", {
            state: { score, correctAnswers, totalLogos: logos.length },
          });
        }

        setIsCorrect(false);
      }, 1500);
    } else {
      setGuessChange(userGuess);
      setGuessesLeft((prev) => prev - 1);
      setScore((prev) => (prev > 10 ? prev - 10 : 0)); // Reduce score by 10 for wrong guess
    }

    if (guessesLeft <= 1) {
      setGuessesLeft(0);
      setScore(0);
      navigate("/results", {
        state: { score, correctAnswers, totalLogos: randomLogos.length },
      });
    }

    setUserGuess("");
  };

  return (
    <div>
      <h1>Guess the Logo</h1>

      {/* Display current logo */}
      <h2>
        Logo {currentLogoIndex + 1} of {randomLogos.length}
      </h2>

      {/* Logo Image Container */}
      <div className="logo-container"></div>
      <LogoComponent
        svgSource={currentLogo.picture}
        isCorrect={isCorrect}
        guess={guessChange}
      ></LogoComponent>
      <div></div>

      {/* Guess Input */}
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Enter your guess"
      />

      <button onClick={handleGuess}>Submit Guess</button>

      {/* Uncomment to see answer (don't include 'logo')*/}
      {/*<p>{currentLogo.name}</p>*/}

      <p>Guesses Left: {guessesLeft}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default Game;
