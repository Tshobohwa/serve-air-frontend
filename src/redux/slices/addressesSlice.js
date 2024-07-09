import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../api/api";

const ADDRESSES_URL = `${API_URL}/addresses`;

export const getOrigins = createAsyncThunk(
  "addresses/getOrigins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/origins`);
      if (response.status !== 200) throw new Error("Couldn't get origins");
      return response.data.data.origins;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDestinations = createAsyncThunk(
  "addresses/getDestinations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/destinations`);
      if (response.status !== 200) throw new Error("Couldn't get destinations");
      return response.data.data.destinations;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAddresses = createAsyncThunk(
  "addresses/getAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ADDRESSES_URL);
      if (response.status !== 200) throw new Error("Couldn't get Addresses!");
      return response.data.data.addresses;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const postAddress = createAsyncThunk(
  "addresses/postAddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await axios.post(ADDRESSES_URL, { address });
      if (response.status !== 201) throw new Error("Couldn't post address");
      return response.data.data.address;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  addresses: [],
  origins: [],
  destinations: [],
  isGettingDestinations: false,
  isGettingOrigins: false,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAddresses.pending, (state) => {
      return { ...state, isFetching: true };
    });
    builder.addCase(getAddresses.fulfilled, (state, { payload }) => {
      return { ...state, isFetching: false, addresses: payload };
    });
    builder.addCase(getAddresses.rejected, (state, { payload }) => {
      return { ...state, isFetching: false, error: payload };
    });
    builder.addCase(postAddress.pending, (state) => {
      return { ...state, isPosting: true };
    });
    builder.addCase(postAddress.fulfilled, (state, { payload }) => {
      const { addresses } = state;
      return { ...state, addresses: [payload, ...addresses], isPosting: false };
    });
    builder.addCase(postAddress.rejected, (state, { payload }) => {
      return { ...state, error: payload };
    });

    builder.addCase(getOrigins.pending, (state) => {
      return { ...state, isGettingOrigins: true };
    });

    builder.addCase(getOrigins.fulfilled, (state, { payload }) => {
      return { ...state, isGettingOrigins: false, origins: payload };
    });

    builder.addCase(getDestinations.pending, (state) => {
      return { ...state, isGettingDestinations: true };
    });

    builder.addCase(getDestinations.fulfilled, (state, { payload }) => {
      return { ...state, isGettingDestinations: false, destinations: payload };
    });
  },
});

export default addressesSlice.reducer;
