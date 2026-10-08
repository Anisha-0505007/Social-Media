import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
  },
  reducers: {
    addFollowing: (state, action) => {
      if (!state.currentUser) return;
      const followingIds = state.currentUser.followings || [];
      if (!followingIds.some((item) => (item?._id || item)?.toString() === action.payload.toString())) {
        state.currentUser.followings = [...followingIds, action.payload];
      }
    },
    removeFollowing: (state, action) => {
      if (!state.currentUser) return;
      state.currentUser.followings = (state.currentUser.followings || []).filter(
        (item) => (item?._id || item)?.toString() !== action.payload.toString()
      );
    },
    patchCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { addFollowing, patchCurrentUser, removeFollowing } = authSlice.actions;
export default authSlice.reducer;
