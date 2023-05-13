import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { categories, loading, allClues } = useSelector((state) => state.game);

  useEffect(() => {
    axios
      .get("https://jservice.io/api/random/?count=10")
      .then((response) => {
        let idsArray = [];

        for (let i = 0; i < response.data.length; i++) {
          const id = response.data[i].category_id;
          idsArray.push(id);
        }

        for (let i = 0; i < idsArray.length; i++) {
          if (!idsArray.includes(idsArray[i])) {
            idsArray.push(idsArray[i]);
          }
        }

        idsArray = idsArray.slice(0, 6);

        dispatch({ type: "SET_CATEGORIES", payload: idsArray });
        dispatch({ type: "SET_LOADING", payload: false });

        // Call getCluesForCategories function with the category IDs obtained from the API
        getCluesForCategories(idsArray);
      })
      .catch((error) => {
        console.log(error.message);

        dispatch({ type: "SET_LOADING", payload: false });
      });
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
