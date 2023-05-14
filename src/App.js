import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./utils/fetchCategories";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { allClues, loading } = useSelector((state) => state.game);

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
      <h1>Jeopardy Game</h1>
      <div className="game-board">
        {allClues.map((category) => (
          <div className="category-column">
            <h2 className="clue-rectangle category-title">
              {toTitleCase(category[0].category.title)}
            </h2>
            {category.map((clue) => (
              <div className="clue-rectangle">
                <p className="clue-value">${clue.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
