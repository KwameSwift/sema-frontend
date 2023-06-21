import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  preview: {},
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPreviewData: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetBlogData: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPreviewData,
  resetBlogData,
} = blogSlice.actions;

export default blogSlice.reducer;
