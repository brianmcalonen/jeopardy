import axios from "axios";
import { setCategories, setAllClues, setLoading } from "../redux/gameSlice";
import { getClues } from "./getClues";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      "https://jservice.io/api/random/?count=10"
    );
    console.log("response", response);
    let idsArray = [];

    if (response.data.length === undefined) return;

    for (let i = 0; i < 10; i++) {
      const id = response.data[i].category_id;
      idsArray.push(id);
    }

    for (let i = 0; i < 10; i++) {
      if (!idsArray.includes(idsArray[i])) {
        idsArray.push(idsArray[i]);
      }
    }

    idsArray = idsArray.slice(0, 6);

    dispatch(setCategories(idsArray));
    dispatch(setLoading(false));

    // Call getClues function with the category IDs obtained from the API
    const result = await getClues(idsArray);

    dispatch(setAllClues(result));
    dispatch(setLoading(false));
  } catch (error) {
    // console.log(error.message);
    dispatch(setLoading(false));
  }
};
