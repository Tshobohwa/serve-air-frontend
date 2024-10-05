import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Addresses from "./pages/Addresses";
import PackageRoutes from "./pages/PackageRoutes";
import Warehouse from "./pages/Warehouse";
import IncomingPackages from "./pages/IncomingPackages";
import OutgoingPackages from "./pages/OutgoingPackages";
import "react-toastify/dist/ReactToastify.css";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/routes" element={<PackageRoutes />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/incoming_packages" element={<IncomingPackages />} />
          <Route path="/outgoing_packages" element={<OutgoingPackages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
