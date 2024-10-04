import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API_URL from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";

const ROUTES_URL = `${API_URL}/routes`;

export const getRoutes = createAsyncThunk(
  "routes/getRoutes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ROUTES_URL);
      if (response.status !== 200) throw new Error("Couldn't get routes");
      console.log(response.data.data);
      return response.data.data.routes;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postRoute = createAsyncThunk(
  "routes/postRoute",
  async (route, { rejectWithValue }) => {
    try {
      const response = await axios.post(ROUTES_URL, { route });
      console.log(route);
      console.log(response);
      if (response.status !== 201) throw new Error("Couldn't post route");
      return response.data.data.route[0];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateRoute = createAsyncThunk(
  "routes/updateRoute",
  async ({ route, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ROUTES_URL}/${id}`, { route });
      if (response.status !== 200) throw new Error("Couldn't update route");
      return response.data.data.route;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  routes: [],
  currentRoute: null,
  isPostingRoute: false,
  isGettingRoutes: false,
  routePosted: false,
  hasUpdatedRoute: false,
};

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setCurrentRoute: (state, { payload }) => {
      const { routes } = state;
      const currentRoute = routes.find((route) => route.id === payload);
      return { ...state, currentRoute };
    },
    removeCurrentRoute: (state) => {
      return { ...state, currentRoute: null };
    },
    resetRoutePosted: (state) => {
      return { ...state, routePosted: false };
    },
    resetHasUpdatedRoute: (state) => {
      return { ...state, hasUpdatedRoute: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoutes.pending, (state) => {
      return { ...state, isGettingRoutes: true };
    });
    builder.addCase(getRoutes.fulfilled, (state, { payload }) => {
      return { ...state, isGettingRoutes: false, routes: payload };
    });
    builder.addCase(postRoute.pending, (state) => {
      return { ...state, isPostingRoute: true };
    });
    builder.addCase(postRoute.fulfilled, (state, { payload }) => {
      toast.success("Route successfully created!");
      let { routes } = state;
      routes = [...routes, payload];
      return { ...state, isPostingRoute: false, routes, routePosted: true };
    });
    builder.addCase(postRoute.rejected, (state) => {
      toast.error("Route not created!");
      return { ...state, isPostingRoute: false };
    });
    builder.addCase(updateRoute.pending, (state) => {
      return { ...state, isUpdatingRoute: true };
    });
    builder.addCase(updateRoute.fulfilled, (state, { payload }) => {
      toast.success("Route pricing successfully updated!");
      let { routes } = state;
      routes = routes.map((route) => {
        if (route.id === payload.id) return payload;
        return route;
      });
      return {
        ...state,
        isUpdatingRoute: false,
        routes,
        currentRoute: null,
        hasUpdatedRoute: true,
      };
    });
  },
});

export const {
  setCurrentRoute,
  removeCurrentRoute,
  resetRoutePosted,
  resetHasUpdatedRoute,
} = routesSlice.actions;

export default routesSlice.reducer;
