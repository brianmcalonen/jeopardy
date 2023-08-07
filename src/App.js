import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./utils/fetchCategories";
import { setSelectedClue } from "./redux/gameSlice";
import ClueModal from "./components/ClueModal";
import "./App.css";
import PlayerCard from "./components/PlayerCard";

function App() {
  const dispatch = useDispatch();
  const { allClues, loading, selectedClue } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Helper function to convert a string to title case
  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

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
        {allClues.map((category) => (
          <div className="category-column">
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
        {/* <div className="player-column">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div> */}
      </div>

      <ClueModal
        show={selectedClue !== null}
        onHide={() => dispatch(setSelectedClue(null))}
        clue={selectedClue}
      />
    </div>
  );
}

export default App;
