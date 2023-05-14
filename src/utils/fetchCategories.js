import axios from "axios";
import { setCategories, setAllClues, setLoading } from "../redux/gameSlice";

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      "https://jservice.io/api/random/?count=10"
    );

    let idsArray = [];

    if (response.data.length === undefined) return;

    for (let i = 0; i < response.data.length; i++) {
      const id = response.data[i].category_id;
      idsArray.push(id);
    }

    for (let i = 0; i < response.data.length; i++) {
      if (!idsArray.includes(idsArray[i])) {
        idsArray.push(idsArray[i]);
      }
    }

    idsArray = idsArray.slice(0, 6);

    dispatch(setCategories(idsArray));
    dispatch(setLoading(false));

    getClues(dispatch, idsArray);
  } catch (error) {
    // console.log(error.message);
    dispatch(setLoading(false));
  }
};

const getClues = (dispatch, ids) => {
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
