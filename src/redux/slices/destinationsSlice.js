import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API_URL from "../api/api";
import axios from "axios";

const DESTINATIONS_URL = `${API_URL}/destinations`;

const initialState = {
  destinations: [],
  isGettingDestinations: false,
  gettingDestinationsError: "",
  currentDestination: null,
};

export const getDestinations = createAsyncThunk(
  "destinations/getDestinations",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(DESTINATIONS_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // if (response.status !== 200) throw new Error("Couldn't get destinations");
      return response.data.data.destinations;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    setCurrentDestination: (state, { payload }) => {
      const currentDestination = state.destinations.find(
        (destination) => destination.address_id === payload
      );
      return { ...state, currentDestination };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDestinations.pending, (state) => {
      return {
        ...state,
        isGettingDestinations: true,
        gettingDestinationsError: "",
      };
    });
    builder.addCase(getDestinations.fulfilled, (state, { payload }) => {
      return { ...state, isGettingDestinations: false, destinations: payload };
    });
    builder.addCase(getDestinations.rejected, (state, { payload }) => {
      return {
        ...state,
        isGettingDestinations: false,
        gettingDestinationsError: payload,
      };
    });
  },
});

export const { setCurrentDestination } = destinationsSlice.actions;

export default destinationsSlice.reducer;
