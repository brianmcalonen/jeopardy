import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { setTotalScore } from "../redux/gameSlice";

const ClueModal = ({ show, onHide, clue }) => {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const { selectedClue } = useSelector((state) => state.game);

  const handleCheckAnswer = (event) => {
    event.preventDefault();
    setShowAnswer(true);
  };

  const handleIncorrect = () => {
    setShowAnswer(false);
    onHide();
    console.log("incorrect", clue);
    dispatch(setTotalScore(clue.value * -1));
  };

  const handleCorrect = () => {
    setShowAnswer(false);
    onHide();
    console.log("correct");
    dispatch(setTotalScore(clue.value));
  };

  if (selectedClue === null) return;

  console.log("Answer: ", selectedClue.answer);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedClue.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleCheckAnswer}>
          <div className="mb-3">
            <div>Q: {selectedClue.question}</div>
            <br />
            <input
              type="text"
              className="form-control"
              id="answer-input"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
            <br />
            {showAnswer && (
              <label htmlFor="answer-input" className="form-label">
                A: {toTitleCase(selectedClue.answer)}
              </label>
            )}
          </div>
          {!showAnswer && (
            <Button variant="primary" type="submit">
              Check Answer
            </Button>
          )}
          {showAnswer && (
            <div>
              <Button
                variant="danger"
                type="submit"
                style={{ marginRight: "20px" }}
                onClick={handleIncorrect}
              >
                Incorrect
              </Button>
              <Button variant="success" type="submit" onClick={handleCorrect}>
                Correct
              </Button>
            </div>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
};

const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export default ClueModal;
