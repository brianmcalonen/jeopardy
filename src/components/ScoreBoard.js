import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const ScoreBoard = () => {
  const score = useSelector((state) => state.game.totalScore);

  return <div>Score: {score}</div>;
};

export default ScoreBoard;
