import React, { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AvailablePackages from "../components/AvailablePackages";

const Warehouse = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <PageWrapper currentPath={location.pathname}>
      <div className="w-full mt-[-1rem]">
        <AvailablePackages />
      </div>
    </PageWrapper>
  );
};

export default Warehouse;
