import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../api/api";
import { toast } from "react-toastify";

const ADDRESSES_URL = `${API_URL}/addresses`;

export const getOrigins = createAsyncThunk(
  "addresses/getOrigins",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/origins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) throw new Error("Couldn't get origins");
      return response.data.data.origins;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDestinations = createAsyncThunk(
  "addresses/getDestinations",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/destinations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
  async ({ address, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        ADDRESSES_URL,
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
  currentOrigin: null,
  currentDestination: null,
  addressPosted: false,
  isPostingAddress: false,
  currentAddress: {},
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,

  reducers: {
    resetAddressPosted: (state) => {
      return { ...state, addressPosted: false };
    },
    setCurrentOriginAndCurrentDestination: (state, { payload }) => {
      const currentOrigin = state.origins.find(
        (origin) => origin.address_id === payload
      );
      const currentDestination = state.destinations.find(
        (destination) => destination.address_id === payload
      );

      return { ...state, currentDestination, currentOrigin };
    },
    setCurrentAddress: (state, { payload }) => {
      const currentAddress = state.addresses.find(
        (address) => address.id === payload
      );
      return { ...state, currentAddress };
    },
  },

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
      return { ...state, isPostingAddress: true };
    });
    builder.addCase(postAddress.fulfilled, (state, { payload }) => {
      toast.success("New Address successfully created!");
      const { addresses } = state;
      return {
        ...state,
        addresses: [payload, ...addresses],
        isPostingAddress: false,
        addressPosted: true,
      };
    });
    builder.addCase(postAddress.rejected, (state, { payload }) => {
      toast.error("Couldn't create the address!");
      return { ...state, error: payload, isPostingAddress: false };
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

export const {
  setCurrentOriginAndCurrentDestination,
  resetAddressPosted,
  setCurrentAddress,
} = addressesSlice.actions;

export default addressesSlice.reducer;
