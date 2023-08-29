import axios from "axios";
import { setCategories, setLoading } from "../redux/gameSlice";
import { getClues } from "./getClues";

let hasRunGetClues = false;

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get("https://jservice.io/api/random/?count=6");

    if (!response.data || response.data.length === 0) {
      dispatch(setLoading(false));
      // Handle this case, maybe dispatch an error state
      return;
    }

    const idsArray = response.data.map((category) => category.id);

    dispatch(setCategories(idsArray));

    console.log(`idsArray`, idsArray);

    // getClues(dispatch, idsArray);
    if (!hasRunGetClues) {
      getClues(dispatch, idsArray);
      hasRunGetClues = true;
    }
  } catch (error) {
    console.log(error.message);
    // Maybe update your state to reflect the error
  } finally {
    dispatch(setLoading(false));
  }
};
