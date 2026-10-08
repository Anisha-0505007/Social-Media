import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts: (_state, action) => action.payload,
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
