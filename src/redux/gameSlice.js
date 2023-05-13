import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    categories: [],
    allClues: [],
    loading: true,
    score: 0,
    showModal: false,
    currentQuestion: null,
    currentAnswer: null,
    currentClueIndex: null,
    categoriesWithClues: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAllClues: (state, action) => {
      state.allClues = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setCurrentAnswer: (state, action) => {
      state.currentAnswer = action.payload;
    },
    setCurrentClueIndex: (state, action) => {
      state.currentClueIndex = action.payload;
    },
    setCategoriesWithClues: (state, action) => {
      state.categoriesWithClues = action.payload;
    },
  },
});

export const {
  setCategories,
  setAllClues,
  setLoading,
  setScore,
  setShowModal,
  setCurrentQuestion,
  setCurrentAnswer,
  setCurrentClueIndex,
  setCategoriesWithClues,
} = gameSlice.actions;

export default gameSlice.reducer;
