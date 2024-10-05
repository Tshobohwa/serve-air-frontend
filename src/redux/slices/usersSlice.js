import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api/api";

export const signup = createAsyncThunk(
  "users/signup",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        user,
      });
      if (response.status !== 200) throw new Error("Couldn't sign up user");
      console.log(response);
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
      if (response.status !== 200) throw new Error("Invalid email or password");
      const data = response.data.status.data;
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return response.data.status.data;
    } catch (error) {
      return rejectWithValue(error);
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
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      return { ...state, currentUser: payload.user, token: payload.token };
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      return {
        ...state,
        currentUser: payload.current_user,
        token: payload.token,
      };
    });
    // builder.addCase(logout.fulfilled, (state) => {
    //   localStorage.clear();
    //   return initialState;
    // });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
