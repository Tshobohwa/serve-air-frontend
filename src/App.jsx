import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Warehouse from "./pages/Warehouse";
import IncomingPackages from "./pages/IncomingPackages";
import OutgoingPackages from "./pages/OutgoingPackages";
import PackageRoutes from "./pages/PackageRoutes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Addresses from "./pages/Addresses";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getStatuses } from "./redux/slices/statusesSlice";
import { useEffect } from "react";
import { getRoutes } from "./redux/slices/routesSlice";
import { getOrigins, setCurrentOrigin } from "./redux/slices/originsSlice";
import { getAddresses } from "./redux/slices/addressesSlice";
import { getPackages } from "./redux/slices/packagesSlice";
import {
  getDestinations,
  setCurrentDestination,
} from "./redux/slices/destinationsSlice";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.users);
  const { origins, currentOrigin } = useSelector((store) => store.origins);
  const { destinations, currentDestination } = useSelector(
    (store) => store.destinations
  );

  const fetchStatuses = () => {
    dispatch(getStatuses());
  };

  const fetchRoutes = () => {
    dispatch(getRoutes());
  };

  const fetchOrigins = () => {
    dispatch(getOrigins());
  };

  const fetchDestinations = () => {
    dispatch(getDestinations());
  };

  useEffect(() => {
    fetchStatuses();
    fetchRoutes();
    fetchOrigins();
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (!currentUser?.address_id) return;
    dispatch(setCurrentOrigin(currentUser.address_id));
    dispatch(setCurrentDestination(currentUser.address_id));
  }, [origins, destinations, currentUser]);

  const fetchData = () => {
    // Get live data
    dispatch(getDestinations());

    dispatch(getOrigins());

    dispatch(getRoutes());

    dispatch(getStatuses());

    dispatch(getAddresses());

    if (
      !currentDestination?.id ||
      !currentOrigin?.id ||
      currentUser?.address_id
    )
      return;
    dispatch(
      getPackages({
        address_id: currentUser?.address_id,
        origin_id: currentOrigin?.id,
        destination_id: currentDestination?.id,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/incoming-packages" element={<IncomingPackages />} />
        <Route path="/outgoing-packages" element={<OutgoingPackages />} />
        <Route path="/routes" element={<PackageRoutes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addresses" element={<Addresses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
