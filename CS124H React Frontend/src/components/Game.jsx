import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Game.css";
import "../components/Logo";
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

  const testsvg =
    "M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262";

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
    if (userGuess.trim().toLowerCase() === currentLogo.name.toLowerCase()) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev); // Score remains the same for correct guess
      setGuessesLeft(5); // Reset guesses for next logo
      if (currentLogoIndex < randomLogos.length - 1) {
        setCurrentLogoIndex((prev) => prev + 1); // Move to next logo
      } else {
        // Game over, navigate to Results page
        navigate("/results", {
          state: { score, correctAnswers, totalLogos: logos.length },
        });
      }
    } else {
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
      <LogoComponent svgSource={currentLogo.picture}></LogoComponent>
      <div></div>

      {/* Guess Input */}
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Enter your guess"
      />

      <button onClick={handleGuess}>Submit Guess</button>

      {/* Troubleshooting, delete later */}
      <p>{currentLogo.name} </p>
      <p>{currentLogo.picture} </p>

      <p>Guesses Left: {guessesLeft}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default Game;
