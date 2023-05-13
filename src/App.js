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
    axios
      .get("https://jservice.io/api/random/?count=10")
      .then((response) => {
        // handle successful response
        console.log(response.data);

        while (categories.length < 6) {
          response.data.forEach((clue) => {
            if (!categories.includes(clue.categoryId)) {
              setCategories(...categories, clue.categoryId);
            }
          });
        }
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
  }, [categories]);

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}

export default App;
