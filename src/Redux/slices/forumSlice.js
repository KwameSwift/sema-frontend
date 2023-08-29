import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    id: 0,
    topic: "",
    description: 0,
};

export const forumSlice = createSlice({
    name: "forum",
    initialState,
    reducers: {
        setForum: (state, action) => {
            const {id, topic, description} = action.payload;
            state.id = id;
            state.topic = topic;
            state.description = description
        },
        resetForum: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setForum,
    resetForum,
} = forumSlice.actions;

export default forumSlice.reducer;
