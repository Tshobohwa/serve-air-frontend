import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getStatuses } from "../redux/slices/statusesSlice";
import { getPackages } from "../redux/slices/packagesSlice";

const PackageStatusesPieChart = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.users);
  const { statuses } = useSelector((state) => state.statuses);
  const { incomingPackages, outgoingPackages } = useSelector(
    (state) => state.packages
  );

  const [data, setData] = useState([]);

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const size = {
    width: 400,
    height: 300,
  };

  useEffect(() => {
    dispatch(getStatuses({ token }));
    dispatch(getPackages({ token }));
  }, []);

  useEffect(() => {
    const data = [];
    statuses.map((status) => data.push({ label: status.name, value: 0 }));
    incomingPackages.forEach((shippment) => {
      const currentStatus = data.find(
        (data) => data.label === shippment.status.name
      );

      currentStatus.value = currentStatus.value + 1;

      data.map((d) => (d.label === currentStatus.label ? currentStatus : d));
    });
    outgoingPackages.forEach((shippment) => {
      const currentStatus = data.find(
        (data) => data.label === shippment.status.name
      );

      currentStatus.value = currentStatus.value + 1;

      data.map((d) => (d.label === currentStatus.label ? currentStatus : d));
    });
    setData(data);
  }, [statuses, incomingPackages, outgoingPackages]);
  return (
    <PieChart series={[{ data, innerRadius: 110 }]} {...size}>
      <PieCenterLabel>Package statuses</PieCenterLabel>
    </PieChart>
  );
};

export default PackageStatusesPieChart;
