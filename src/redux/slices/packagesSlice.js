import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../api/api";
import { toast } from "react-toastify";

const PACKAGES_URL = `${API_URL}/packages`;

// Fetch the packages from the remote database
export const getPackages = createAsyncThunk(
  "packages/getPackages",
  async (
    { address_id, origin_id, destination_id, token },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${PACKAGES_URL}?address_id=${address_id}&origin_id=${origin_id}&destination_id=${destination_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status !== 200) throw new Error("Couldn't get packages");
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Post package in the remote database
export const postPackage = createAsyncThunk(
  "packages/postPackage",
  async ({ shippment, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        PACKAGES_URL,
        { shippment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response?.status !== 201) throw new Error("Couldn't create package");
      return response.data.data.package;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  packages: [],
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
      return {
        ...state,
        isGettingPackages: false,
        packages: payload.packages,
        incomingPackages: payload.incoming_packages,
        outgoingPackages: payload.outgoing_packages,
      };
    });

    builder.addCase(postPackage.pending, (state) => {
      return {
        ...state,
        isPostingPackage: true,
        postPackageError: initialState.postPackageError,
      };
    });

    builder.addCase(postPackage.fulfilled, (state, { payload }) => {
      toast.success("Package posted successfully");
      return {
        ...state,
        isPostingPackage: false,
        packageIsPosted: true,
        packages: [...state.packages, payload],
      };
    });

    builder.addCase(postPackage.rejected, (state, { payload }) => {
      toast.error("Couldn't post package!");
      return { ...state, isPostingPackage: false, postPackageError: payload };
    });
  },
});

export const { setCurrentPackage, removeCurrentPackage, resetIsPackagePosted } =
  packagesSlice.actions;

export default packagesSlice.reducer;
