import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./utils/fetchCategories";
import { setSelectedClue } from "./redux/gameSlice";
import ClueModal from "./components/ClueModal";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { allClues, loading, selectedClue } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
        <img src="/Jeopardy.png" alt="Jeopardy logo" width={"300px"} />
      </div>

      <div
        className="game-board"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {allClues.map((category, index) => (
          <div className="category-column" key={index}>
            <h2 className="clue-rectangle category-title">
              {toTitleCase(category[0].category.title)}
            </h2>
            {category.map((clue) => (
              <div
                className={`clue-rectangle ${clue.disabled ? "disabled" : ""}`}
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
