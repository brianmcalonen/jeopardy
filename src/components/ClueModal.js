import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const ClueModal = ({ show, onHide, clue }) => {
  const [answer, setAnswer] = useState("");
  const { selectedClue } = useSelector((state) => state.game);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Submitted answer:", answer);
    onHide();
  };

  if (selectedClue === null) return;

  console.log("Answer: ", answer);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedClue.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div>Question: {selectedClue.question}</div>
            {/* <label htmlFor="answer-input" className="form-label">
              Answer: {selectedClue.answer}
            </label> */}
            <input
              type="text"
              className="form-control"
              id="answer-input"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ClueModal;
