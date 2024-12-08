import React, { useRef, useState, useEffect } from "react";
import "../LogoStyles.css";

const LogoComponent = ({ svgSource, isCorrect, guess }) => {
  const imgRef = useRef(null); // Reference to the image element
  const [transformations, setTransformations] = useState({
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    grayscale: 80, // Initial grayscale percentage
    blur: 15, // Initial blur in pixels
  });

  // Function to generate random transformations
  const generateTransformations = () => ({
    rotate: Math.random() * 360,
    scaleX: Math.random() * 0.7 + 0.3,
    scaleY: Math.random() * 0.7 + 0.3,
    grayscale: Math.random() * 50 + 30, // Random grayscale between 30% and 80%
    blur: Math.random() * 8 + 2, // Random blur between 2px and 10px
  });

  const distort = () => {
    const newTransformations = generateTransformations();
    setTransformations(newTransformations);

    const transformation = `rotate(${newTransformations.rotate}deg) scale(${newTransformations.scaleX}, ${newTransformations.scaleY})`;

    const img = imgRef.current;
    img.style.transform = transformation;
    img.style.filter = `grayscale(${newTransformations.grayscale}%) blur(${newTransformations.blur}px)`; // Apply randomized grayscale and blur filters
  };

  const reset = (duration = 1500) => {
    const img = imgRef.current;
    const startTime = performance.now();

    // Animate reset transformations for the image
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3); // Smooth easing function

      // Use the stored transformations for resetting
      const transformString = `rotate(${
        transformations.rotate * (1 - easedProgress)
      }deg) scale(${1 + (transformations.scaleX - 1) * easedProgress}, ${
        1 + (transformations.scaleY - 1) * easedProgress
      })`;

      img.style.transform = transformString;

      // Gradually reset filters
      const grayscale =
        transformations.grayscale - progress * transformations.grayscale;
      const blur = transformations.blur - progress * transformations.blur;
      img.style.filter = `grayscale(${grayscale}%) blur(${blur}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const correctGuess = () => {
    reset();
  };

  useEffect(() => {
    // Apply distortion every time svgSource changes
    if (svgSource && !guess) {
      setTimeout(distort, 1600);
    }
    // Redistorts if guess is missed

    if (guess) {
      setTimeout(distort, 500);
    }

    if (isCorrect) {
      correctGuess();
    }

    //zoom(2); // Uncomment if zoom is required
  }, [svgSource, isCorrect, guess]); // Trigger the effect when svgSource, isCorrect, or guess changes

  return (
    <div className="logo-container">
      <div className="image">
        <img
          ref={imgRef}
          src={svgSource}
          alt="Logo"
          style={{
            transition: "transform 0.3s ease, filter 0.3s ease",
            transform: `rotate(${transformations.rotate}deg) scale(${transformations.scaleX}, ${transformations.scaleY})`,
            filter: `grayscale(${transformations.grayscale}%) blur(${transformations.blur}px)`, // Apply dynamic grayscale and blur
          }}
        />
      </div>
    </div>
  );
};

export default LogoComponent;
