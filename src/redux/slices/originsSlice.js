import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API_URL from "../api/api";
import axios from "axios";

const ORIGINS_URL = `${API_URL}/origins`;

export const getOrigins = createAsyncThunk(
  "origins/getOrigins",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(ORIGINS_URL, {
        headers: { Authorization: `Barer ${token}` },
      });
      if (response.status !== 200) throw new Error("Couldn't get origins");
      return response.data.data.origins;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  origins: [],
  currentOrigin: {},
  isGettingOrigins: false,
};

const originsSlice = createSlice({
  name: "origin",

  initialState,

  reducers: {
    setCurrentOrigin: (state, { payload }) => {
      let currentOrigin = state.origins.find(
        (origin) => origin.address_id === payload
      );
      return { ...state, currentOrigin };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getOrigins.pending, (state) => {
      return { ...state, isGettingOrigins: true };
    });
    builder.addCase(getOrigins.fulfilled, (state, { payload }) => {
      return { ...state, isGettingOrigins: false, origins: payload };
    });
    builder.addCase(getOrigins.rejected, (state, { payload }) => {
      return { ...state, isGettingOrigins: false, getOriginsError: payload };
    });
  },
});

export const { setCurrentOrigin } = originsSlice.actions;

export default originsSlice.reducer;
