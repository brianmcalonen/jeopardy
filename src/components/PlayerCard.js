import React, { useState } from "react";
import "../App.css";

const Card = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleScoreChange = (e) => {
    setScore(parseInt(e.target.value));
  };

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 100);
  };

  const decrementScore = () => {
    setScore((prevScore) => prevScore - 100);
  };

  return (
    <div className="player-card">
      <div className="name-container">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
      </div>

      <div className="score-container">
        <input type="number" value={score} onChange={handleScoreChange} />
        <div className="score-buttons">
          <button onClick={decrementScore}>- 100</button>
          <button onClick={incrementScore}>+ 100</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
