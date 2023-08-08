import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    categories: [],
    allClues: [],
    loading: true,
    selectedClue: null,
    totalScore: 0,
  },
  reducers: {
    setTotalScore: (state, action) => {
      state.totalScore += action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAllClues: (state, action) => {
      // Set the 'disabled' property to false for all clues
      state.allClues = action.payload.map((category) =>
        category.map((clue) => ({ ...clue, disabled: false }))
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedClue: (state, action) => {
      const clue = action.payload;
      if (clue !== null) {
        // Mark the selected clue as disabled in the allClues array
        state.allClues = state.allClues.map((category) =>
          category.map((c) => (c.id === clue.id ? { ...c, disabled: true } : c))
        );
      }

      // Set the selected clue
      state.selectedClue = clue;
    },
  },
});

export const {
  setCategories,
  setAllClues,
  setLoading,
  setSelectedClue,
  setTotalScore,
} = gameSlice.actions;

export default gameSlice.reducer;
