import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoutes = () => {
  const { currentUser } = useSelector((store) => store.users);
  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoutes;
