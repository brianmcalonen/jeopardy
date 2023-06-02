import React, { useState } from "react";

const PlayerCard = () => {
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
    <div className="card">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />

      <div className="score-container">
        <button onClick={decrementScore}>-</button>
        <input type="number" value={score} onChange={handleScoreChange} />
        <button onClick={incrementScore}>+</button>
      </div>
    </div>
  );
};

export default PlayerCard;
