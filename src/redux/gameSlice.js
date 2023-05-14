import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    categories: [],
    allClues: [],
    loading: true,
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
  },
});

export const { setCategories, setAllClues, setLoading } = gameSlice.actions;

export default gameSlice.reducer;
