import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const PackagesOriginisAndDestinationBarChart = () => {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={600}
      height={300}
    />
  );
};

export default PackagesOriginisAndDestinationBarChart;
