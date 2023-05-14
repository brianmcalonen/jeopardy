import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    categories: [],
    allClues: [],
    loading: true,
    selectedClue: null,
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
    setSelectedClue: (state, action) => {
      state.selectedClue = action.payload;
    },
  },
});

export const { setCategories, setAllClues, setLoading, setSelectedClue } =
  gameSlice.actions;

export default gameSlice.reducer;
