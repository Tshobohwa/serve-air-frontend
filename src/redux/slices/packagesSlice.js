import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import incomingFreight from "../../mockingData/incomingFreight";
import outgoingFreight from "../../mockingData/outgoingPackages";
import axios from "axios";
import API_URL from "../api/api";

const PACKAGES_URL = `${API_URL}/packages`;

// Fetch the packages from the remote database
export const getPackages = createAsyncThunk(
  "packages/getPackages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(PACKAGES_URL);
      if (response.status !== 200) throw new Error("Couldn't get packages");
      return response.data.data.packages;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Post package in the remote database
export const postPackage = createAsyncThunk(
  "packages/postPackage",
  async ({ newPackage }, { rejectWithValue }) => {
    try {
      const response = await axios.post(PACKAGES_URL, { package: newPackage });
      if (response?.status !== 200) throw new Error("Couldn't create package");
      return response.data.data.package;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  packages: [...incomingFreight, ...outgoingFreight],
  currentPackage: null,
  incomingPackages: [],
  outgoingPackages: [],
  packageIsPosted: false,
  postPackageError: "",
  isPostingPackage: false,
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    resetIsPackagePosted: (state) => {
      return { ...state, packageIsPosted: false };
    },
    filterIncomingAndOutgoingPackages: (state) => {
      const { packages } = state;
      const incomingPackages = packages.filter(
        (incomingPackage) => incomingPackage.origin
      );
      const outgoingPackages = packages.filter(
        (outgoingPackage) => outgoingPackage.destination
      );
      return { ...state, incomingPackages, outgoingPackages };
    },
    setCurrentPackage: (state, { payload }) => {
      const { packages } = state;
      const currentPackage = packages.find((pack) => pack.id === payload);
      return { ...state, currentPackage };
    },
    removeCurrentPackage: (state) => {
      return { ...state, currentPackage: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPackages.pending, (state) => {
      return { ...state, isGettingPackages: true };
    });
    builder.addCase(getPackages.fulfilled, (state, { payload }) => {
      console.log(payload);
      return { ...state, isGettingPackages: false, packages: payload };
    });

    builder.addCase(postPackage.pending, (state) => {
      return {
        ...state,
        isPostingPackage: true,
        postPackageError: initialState.postPackageError,
      };
    });

    builder.addCase(postPackage.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isPostingPackage: false,
        packageIsPosted: true,
        packages: [...state.packages, payload],
      };
    });

    builder.addCase(postPackage.rejected, (state, { payload }) => {
      return { ...state, isPostingPackage: false, postPackageError: payload };
    });
  },
});

export const {
  filterIncomingAndOutgoingPackages,
  setCurrentPackage,
  removeCurrentPackage,
  resetIsPackagePosted,
} = packagesSlice.actions;

export default packagesSlice.reducer;
