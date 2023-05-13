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
  const [loading, setLoading] = useState(true);
  const [allClues, setAllClues] = useState(true);

  useEffect(() => {
    axios
      .get("https://jservice.io/api/random/?count=10")
      .then((response) => {
        const idsArray = [];
        let uniqueIds = [];

        for (let i = 0; i < response.data.length; i++) {
          const id = response.data[i].category_id;
          idsArray.push(id);
        }

        for (let i = 0; i < idsArray.length; i++) {
          if (!uniqueIds.includes(idsArray[i])) {
            uniqueIds.push(idsArray[i]);
          }
        }

        uniqueIds = uniqueIds.slice(0, 6);

        setCategories(uniqueIds);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && categories.length === 6) {
      getCluesForCategories(categories);
    }
  }, [loading]);

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

const getCluesForCategories = (ids) => {
  const promises = [];

  for (let i = 0; i < ids.length; i++) {
    const promise = axios.get(
      `https://jservice.io/api/clues/?category=${ids[i]}`
    );
    promises.push(promise);
  }

  Promise.all(promises)
    .then((responses) => {
      const allClues = [];

      responses.forEach((response) => {
        // sort based on clue value
        let newArr = response.data.map((obj) => ({
          ...obj,
          value: obj.value !== null ? obj.value : 1000,
        }));

        newArr.sort((a, b) => a.value - b.value);

        newArr = newArr.slice(0, 5);

        console.log("\n");
        console.log(newArr[0].category.title);

        newArr.forEach((clue) => {
          console.log(`$${clue.value}`);
          console.log("Question:", clue.question);
          console.log("Answer: ", clue.answer);
        });

        console.log("\n");

        allClues.push(newArr);
      });

      console.log("allClues", allClues);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
