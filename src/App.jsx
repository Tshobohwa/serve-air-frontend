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
import { getAddresses, getDestinations } from "./redux/slices/addressesSlice";
import { getPackages } from "./redux/slices/packagesSlice";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.users);
  const { origins } = useSelector((store) => store.origins);

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
    if (!currentUser.address_id) return;
    dispatch(setCurrentOrigin(currentUser.address_id));
  }, [origins, currentUser]);

  const fetchData = () => {
    // Get live data
    dispatch(getDestinations());

    dispatch(getOrigins());

    dispatch(getRoutes());

    dispatch(getStatuses());

    dispatch(getAddresses());

    dispatch(getPackages());
  };

  useEffect(() => {
    setInterval(fetchData, 5000);
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
