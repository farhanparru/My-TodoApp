import { useState } from 'react';

const Example = () => {
  const [color, setColor] = useState(""); 


  
  const handleButtonClick = () => {
    const newColor = color === "blue" ? "green" : "blue"; 
    setColor(newColor);
    document.body.style.backgroundColor = newColor; 
  };



  return (
    <div>
      <button onClick={handleButtonClick} style={{ color: "white", backgroundColor: "black", padding: "10px", fontSize: "16px" }}>
        Change Background Color
      </button>
    </div>
  );
};

export default Example;
