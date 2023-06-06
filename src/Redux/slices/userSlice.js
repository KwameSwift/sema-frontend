import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  tokens: {},
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetUserData: (state) => {
      Object.assign(state, {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;