import React, { useRef, useState, useEffect } from "react";
import "../LogoStyles.css";

const LogoComponent = ({ svgSource }) => {
  const imgRef = useRef(null); // Reference to the image element
  const [zoomLevel, setZoomLevel] = useState(1); // State to manage zoom level
  const [result, setResult] = useState("");

  // Initial transformations
  const initialTransformations = {
    rotate: Math.random() * 360,
    scaleX: Math.random() + 0.1,
    scaleY: Math.random() + 0.1,
  };

  const transformation = `rotate(${initialTransformations.rotate}deg) scale(${initialTransformations.scaleX}, ${initialTransformations.scaleY})`;

  const distort = () => {
    const img = imgRef.current;

    // Apply transformations to the image itself
    img.style.transform = transformation;
    img.style.filter = "grayscale(20%) blur(5px)"; // Apply grayscale and blur filters
  };

  const reset = (duration = 1000) => {
    const img = imgRef.current;
    const startTime = performance.now();

    // Animate reset transformations for the image
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3); // Smooth easing function
      const transformString = `rotate(${
        initialTransformations.rotate * (1 - easedProgress)
      }deg) scale(${1 + (initialTransformations.scaleX - 1) * easedProgress}, ${
        1 + (initialTransformations.scaleY - 1) * easedProgress
      })`;

      img.style.transform = transformString;

      // Gradually reset filters
      const grayscale = 100 - progress * 100;
      const blur = 5 - progress * 5;
      img.style.filter = `grayscale(${grayscale}%) blur(${blur}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const zoom = (factor) => {
    const img = imgRef.current;
    const newWidth = img.clientWidth * factor;
    const newHeight = img.clientHeight * factor;
    img.style.width = `${newWidth}px`;
    img.style.height = `${newHeight}px`;
    setZoomLevel(zoomLevel * factor);
  };

  const handleSubmit = () => {
    if (inputValue.toLowerCase().trim() === answer.toLowerCase()) {
      setResult("Correct!");
      reset();
    } else {
      if (zoomLevel !== 1) zoom(2);
      setResult("Incorrect.");
    }
  };

  useEffect(() => {
    distort(); // Apply distortion on component mount
  }, []);

  return (
    <div className="logo-container">
      <div className="image">
        <img
          ref={imgRef}
          src={svgSource}
          alt="Logo"
          style={{ transition: "transform 0.3s ease, filter 0.3s ease" }} // Optional transition for smooth animation
        />
      </div>
    </div>
  );
};

export default LogoComponent;
