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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/routes" element={<PackageRoutes />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/incoming_packages" element={<IncomingPackages />} />
        <Route path="/outgoing_packages" element={<OutgoingPackages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
