import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axioscalls/axios";

export const fetchReelsByUsername = createAsyncThunk(
  "reels/fetchByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/reels/user/${username}`);
      return response.data.reels || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load reels."
      );
    }
  }
);

const reelsSlice = createSlice({
  name: "reels",
  initialState: {
    byUsername: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReelsByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReelsByUsername.fulfilled, (state, action) => {
        state.byUsername[action.meta.arg] = action.payload;
        state.loading = false;
      })
      .addCase(fetchReelsByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectReelsByUsername = (state, username) =>
  state.reels.byUsername[username] || [];
export default reelsSlice.reducer;
