import React, { useRef, useEffect, useState } from "react";
import "../LogoStyles.css"; 

const LogoComponent = ({ svgPath, answer }) => {
  const svgRef = useRef(null); // Reference to the SVG element
  const [zoomLevel, setZoomLevel] = useState(1); // State to manage zoom level
  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Initial transformations
  const initialTransformations = {
    rotate: Math.random() * 360,
    scaleX: Math.random() + 0.1,
    scaleY: Math.random() + 0.1,
  };

  const transformation = `rotate(${initialTransformations.rotate} 750 750) scale(${initialTransformations.scaleX} ${initialTransformations.scaleY})`;

  const distort = () => {
    const svg = svgRef.current;
    const pathElement = svg.querySelector("path");

    // Apply transformations
    pathElement.setAttribute("transform", transformation);

    // Apply filters
    svg.style.filter = "grayscale(100%) blur(5px)";
  };

  const reset = (duration = 1000) => {
    const svg = svgRef.current;
    const pathElement = svg.querySelector("path");
    const startTime = performance.now();

    // Animate reset transformations
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3); // Smooth easing function
      const transformString = `rotate(${initialTransformations.rotate * (1 - easedProgress)} 750 750) scale(${1 + (initialTransformations.scaleX - 1) * easedProgress} ${1 + (initialTransformations.scaleY - 1) * easedProgress})`;

      pathElement.setAttribute("transform", transformString);

      // Gradually reset filters
      const grayscale = 100 - progress * 100;
      const blur = 5 - progress * 5;
      svg.style.filter = `grayscale(${grayscale}%) blur(${blur}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const zoom = (factor) => {
    const svg = svgRef.current;
    const currentViewBox = svg.getAttribute("viewBox").split(" ").map(Number);
    const [minX, minY, width, height] = currentViewBox;

    const newWidth = width * factor;
    const newHeight = height * factor;
    const newMinX = minX + (width - newWidth) * 0.5;
    const newMinY = minY + (height - newHeight) * 0.5;

    svg.setAttribute("viewBox", `${newMinX} ${newMinY} ${newWidth} ${newHeight}`);
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
        <svg
          ref={svgRef}
          height="500"
          width="500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1500 1500"
        >
          <path d={svgPath} />
        </svg>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleSubmit}>Submit</button>
      <p style={{ color: result === "Correct!" ? "green" : "red" }}>{result}</p>
    </div>
  );
};

export default LogoComponent;
