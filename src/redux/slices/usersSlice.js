import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { toast } from "react-toastify";

export const signup = createAsyncThunk(
  "users/signup",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        user,
      });
      if (response.status !== 200) throw new Error("Couldn't sign up user");
      const data = response.data.data;
      localStorage.setItem("currentUser", JSON.stringify(data.current_user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        user,
      });
      if (response.status !== 200)
        throw new Error(
          response.data ? response.data : "An error occured please try again!"
        );
      const data = response.data.status.data;
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return response.data.status.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An Error occured please try again!"
      );
    }
  }
);

// export const logout = createAsyncThunk(
//   "users/logout",
//   async ({ token }, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`${BASE_URL}/logout`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.status !== 200 || response.status !== 401)
//         throw new Error("Couldn't logout");
//       return true;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  token: localStorage.getItem("token") || null,
  isPending: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      return { ...state, currentUser: null, token: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return { ...state, isPending: true };
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      return {
        ...state,
        currentUser: payload.user,
        token: payload.token,
        isPending: false,
      };
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      toast.error(payload);
      return { ...state, isPending: false };
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      return {
        ...state,
        currentUser: payload.current_user,
        token: payload.token,
      };
    });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
