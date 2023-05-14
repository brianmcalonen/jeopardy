import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./utils/fetchCategories";

function App() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Jeopardy Game</h1>
    </div>
  );
}

export default App;
