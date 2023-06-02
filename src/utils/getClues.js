import axios from "axios";
import { setAllClues, setLoading } from "../redux/gameSlice";

export const getClues = async (dispatch, ids) => {
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

        allClues.push(newArr);

        index++;

        getNextClues();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  getNextClues();
  dispatch(setLoading(false));
};
