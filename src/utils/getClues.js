import axios from "axios";
import { setCategories, setAllClues, setLoading } from "../redux/gameSlice";

export const getClues = (dispatch, ids) => {
  let allClues = [];

  let index = 0;

  const getNextClues = () => {
    if (index >= ids.length) {
      dispatch(setAllClues(allClues));
      return;
    }

    axios
      .get(`https://jservice.io/api/clues/?category=${ids[index]}`)
      .then((response) => {
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

        index++;

        getNextClues();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  getNextClues();
};
