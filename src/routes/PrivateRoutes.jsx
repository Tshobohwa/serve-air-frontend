import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { currentUser } = useSelector((store) => store.users);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
