import { configureStore } from "redux";

const initialState = {
  categories: [],
  loading: true,
  allClues: [],
  currentClue: null,
  score: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ALL_CLUES":
      return { ...state, allClues: action.payload };
    case "SET_CURRENT_CLUE":
      return { ...state, currentClue: action.payload };
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + action.payload };
    default:
      return state;
  }
}

const store = configureStore(reducer);

export default store;
