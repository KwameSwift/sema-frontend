import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    id: "",
    username: "",
    name: "",
    isVerified: 0,
    type: "",
    deleted: 0,
    token: "",
    expiresIn: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer