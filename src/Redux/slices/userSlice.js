import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    tokens: {},
    user: {},
    permissions: [],
    liked_blogs: [],
    liked_discussions: [],
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            Object.assign(state, action.payload);
        },
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },
        setUserTokens: (state, action) => {
            state.tokens.access = action.payload;
        },
        setLikedBlogs: (state, action) => {
            state.liked_blogs = action.payload;
        },
        setLikedDiscussions: (state, action) => {
            state.liked_discussions = action.payload;
        },
        setUserInfo: (state, action) => {
            state.user = {...state.user, ...action.payload};
        },
        resetUserData: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setUserData,
    setUserEmail,
    setUserTokens,
    setUserInfo,
    setLikedBlogs,
    setLikedDiscussions,
    resetUserData,
} = userSlice.actions;

export default userSlice.reducer;
