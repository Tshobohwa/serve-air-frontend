import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API_URL from "../api/api";
import axios from "axios";

const STATUSES_URL = `${API_URL}/statuses`;

export const getStatuses = createAsyncThunk(
  "statuses/getStatuses",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(STATUSES_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) throw new Error("Couldn't get statuses");
      return response.data.data.statuses;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  statuses: [],
  isGettingStatuses: false,
  error: "",
};

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStatuses.pending, (state) => {
      return { ...state, isGettingStatuses: true };
    });
    builder.addCase(getStatuses.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isGettingStatuses: false,
        statuses: payload,
        error: initialState.error,
      };
    });
    builder.addCase(getStatuses.rejected, (state, { payload }) => {
      return {
        ...state,
        isGettingStatuses: false,
        error: payload,
      };
    });
  },
});

export default statusesSlice.reducer;
