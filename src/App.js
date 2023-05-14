import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./utils/fetchCategories";

function App() {
  const dispatch = useDispatch();
  const { allClues, loading } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Jeopardy Game</h1>
      <div className="game-board">
        {allClues.map((category) => (
          <div className="category-column">
            <h2>{category[0].category.title}</h2>
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
