// write useEffect that hits the /api/random endpoint using axios 6 times
// put those category ids in an array, make sure theres no duplicates
// for each category, get the five clues
// render the gameboard, 6 columns, 5 clues each
// render the scoreboard, set to 0
// on click, open the modal
// display the question and input and button for submit
// on submit, show the correct answer
// toggle the colors based on correct answer
// update the score based on correct answer
// x to close modal, disable the clue square

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ids = [];
      while (ids.length < 6) {
        const { data } = await axios.get("https://jservice.io/api/random");
        const categoryId = data;
        // const categoryId = data[0].category_id;

        console.log("categoryId", categoryId);
        if (!ids.includes(categoryId)) {
          ids.push(categoryId);
        }
      }
      setCategories(ids);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    // render your component here
    <h1>hi</h1>
  );
}

export default App;
