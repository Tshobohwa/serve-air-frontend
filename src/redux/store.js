import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import packagesReducer from "./slices/packagesSlice";
import routesReducer from "./slices/routesSlice";
import addressesReducer from "./slices/addressesSlice";
import statusesReducer from "./slices/statusesSlice";
import originsReducer from "./slices/originsSlice";
import destinationsReducer from "./slices/destinationsSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    packages: packagesReducer,
    routes: routesReducer,
    addresses: addressesReducer,
    statuses: statusesReducer,
    origins: originsReducer,
    destinations: destinationsReducer,
  },
});

export default store;
