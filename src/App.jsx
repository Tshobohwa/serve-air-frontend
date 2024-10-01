import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Addresses from "./pages/Addresses";
import PackageRoutes from "./pages/PackageRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/routes" element={<PackageRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
