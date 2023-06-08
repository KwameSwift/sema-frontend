import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  tokens: {},
  user: {},
  email: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      Object.assign(state, action.payload);
    },
    setUserEmail: (state, action) => {
      state.email = action.payload
    },
    resetUserData: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, setUserEmail, resetUserData } = userSlice.actions;

export default userSlice.reducer;