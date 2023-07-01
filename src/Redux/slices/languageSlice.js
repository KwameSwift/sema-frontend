import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  code: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguageCode: (state, action) => {
      state.code = action.payload;
    },
    resetLanguageCode: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLanguageCode,
  resetLanguageCode,
} = languageSlice.actions;

export default languageSlice.reducer;
