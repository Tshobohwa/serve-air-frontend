import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Addresses from "./pages/Addresses";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/addresses" element={<Addresses />} />
        {/* <Route path="/warehouse" element={<Warehouse />} /> */}
        {/* <Route path="/incoming-packages" element={<IncomingPackages />} /> */}
        {/* <Route path="/outgoing-packages" element={<OutgoingPackages />} /> */}
        {/* <Route path="/routes" element={<PackageRoutes />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/addresses" element={<Addresses />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
