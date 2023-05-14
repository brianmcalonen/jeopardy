import axios from "axios";
import { setCategories, setAllClues, setLoading } from "../redux/gameSlice";

export const getClues = async (dispatch, ids) => {
  const promises = [];

  for (let i = 0; i < ids.length; i++) {
    const promise = axios.get(
      `https://jservice.io/api/clues/?category=${ids[i]}`
    );
    promises.push(promise);
  }

  try {
    const responses = await Promise.all(promises);

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

      dispatch(setAllClues(allClues));
    });
  } catch (error) {
    console.log(error.message);
  }
};
