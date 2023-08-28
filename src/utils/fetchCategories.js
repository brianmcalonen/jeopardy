import axios from "axios";
import { setCategories, setLoading } from "../redux/gameSlice";
import { getClues } from "./getClues";

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      "https://jservice.io/api/categories/?count=6"
    );

    if (!response.data || response.data.length === 0) return;

    const idsArray = response.data.map((category) => category.id);

    dispatch(setCategories(idsArray));

    console.log("idsArray", idsArray);

    getClues(dispatch, idsArray);
  } catch (error) {
    console.log(error.message);
  }
};
