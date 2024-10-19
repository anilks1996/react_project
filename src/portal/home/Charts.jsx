import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Charts() {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: ["bar A", "bar B", "bar C", "bar D", "bar E"],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: [2, 5, 3, 4, 2],
        },
      ]}
      width={350}
      height={300}
    />
  );
}
