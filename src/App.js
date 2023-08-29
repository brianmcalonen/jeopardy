import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./utils/fetchCategories";
import { setSelectedClue } from "./redux/gameSlice";
import ClueModal from "./components/ClueModal";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { allClues, loading, selectedClue } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <img src="Jeopardy.png" alt="Jeopardy logo" width={"300px"} />
        <br />
        <ScoreBoard />
        <br />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="game-board">
          {allClues &&
            allClues.length > 0 &&
            allClues.map((category, index) => (
              <div className="category-column" key={index}>
                <h2 className="clue-rectangle category-title">
                  {category && category[0] && category[0].category
                    ? toTitleCase(category[0].category.title)
                    : "N/A"}
                </h2>

                {category.map((clue) => (
                  <div
                    className={`clue-rectangle ${
                      clue.disabled ? "disabled" : ""
                    }`}
                    key={clue.id}
                    onClick={() =>
                      !clue.disabled && dispatch(setSelectedClue(clue))
                    }
                  >
                    <p className="clue-value">${clue.value}</p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      <ClueModal
        show={selectedClue !== null}
        onHide={() => dispatch(setSelectedClue(null))}
        clue={selectedClue}
      />
    </div>
  );
}

const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export default App;
