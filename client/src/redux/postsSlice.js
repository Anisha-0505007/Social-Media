import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axioscalls/axios";

export const fetchPostsByUsername = createAsyncThunk(
  "posts/fetchByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/posts/user/${username}`);
      return response.data.posts || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load posts."
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    byUsername: {},
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
    updatePostLike: (state, action) => {
      const { postId, userId, liked } = action.payload;
      const posts = Object.values(state.byUsername).flat();
      const post = posts.find((item) => item._id === postId);
      if (!post) return;

      const likes = post.likes || [];
      post.likes = liked
        ? [...likes.filter((id) => (id?._id || id)?.toString() !== userId?.toString()), userId]
        : likes.filter((id) => (id?._id || id)?.toString() !== userId?.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUsername.fulfilled, (state, action) => {
        state.byUsername[action.meta.arg] = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPosts, updatePostLike } = postsSlice.actions;
export const selectPostsByUsername = (state, username) =>
  state.posts.byUsername[username] || [];
export default postsSlice.reducer;
