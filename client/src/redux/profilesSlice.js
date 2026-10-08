import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axioscalls/axios";

export const fetchProfileByUsername = createAsyncThunk(
  "profiles/fetchByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/profile/${username}`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load this profile."
      );
    }
  }
);

const profilesSlice = createSlice({
  name: "profiles",
  initialState: {
    byUsername: {},
    loadingByUsername: {},
    errorByUsername: {},
  },
  reducers: {
    upsertProfile: (state, action) => {
      const profile = action.payload;
      if (profile?.username) {
        state.byUsername[profile.username] = profile;
      }
    },
    removeProfileKey: (state, action) => {
      delete state.byUsername[action.payload];
      delete state.loadingByUsername[action.payload];
      delete state.errorByUsername[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileByUsername.pending, (state, action) => {
        const username = action.meta.arg;
        state.loadingByUsername[username] = true;
        delete state.errorByUsername[username];
      })
      .addCase(fetchProfileByUsername.fulfilled, (state, action) => {
        const username = action.meta.arg;
        state.byUsername[username] = action.payload;
        state.loadingByUsername[username] = false;
      })
      .addCase(fetchProfileByUsername.rejected, (state, action) => {
        const username = action.meta.arg;
        state.loadingByUsername[username] = false;
        state.errorByUsername[username] = action.payload || action.error.message;
      });
  },
});

export const { removeProfileKey, upsertProfile } = profilesSlice.actions;
export const selectProfileByUsername = (state, username) =>
  state.profiles.byUsername[username];
export default profilesSlice.reducer;
