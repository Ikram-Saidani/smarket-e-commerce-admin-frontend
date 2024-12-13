import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import useFetchOrders from "../../customHooks/order/useFetchOrders";

function TotalSales() {
  const orders = useFetchOrders();
  const [highlightedItem, setHighLightedItem] = useState(null);

  if (!orders || orders.length === 0) {
    return <div>Loading or No Data Available</div>;
  }

  // Sort orders by creation date
  const sortedOrders = orders.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });

  // Regroup sales by month and year
  const groupSales = sortedOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month + 1}`;
    if (!acc[key]) {
      acc[key] = {
        totalSales: 0,
        month: month + 1,
        year: year,
      };
    }
    acc[key].totalSales += order.paymentTotal;
    return acc;
  }, {});

  const groupedSalesArray = Object.keys(groupSales).map((key) => ({
    ...groupSales[key],
    key,
  }));

  const maxSales = Math.max(...groupedSalesArray.map((group) => group.totalSales));

  const barChartProps = {
    series: [
      {
        data: groupedSalesArray.map((group) => group.totalSales),
        id: "sales",
        highlightScope: { highlight: "item", fade: "global" },
      },
    ],
    xAxis: [
      {
        scaleType: "band",
        data: groupedSalesArray.map((group) => `${group.year}-${group.month}`),
        label: "Months",
      },
    ],
    yAxis: [
      {
        scaleType: "linear",
        min: 0,
        max: maxSales,
      },
    ],
    height: 400,
    width: 400,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  const pieChartProps = {
    series: [
      {
        id: "sales",
        data: groupedSalesArray.map((group) => ({
          value: group.totalSales,
          label: `${group.year}-${group.month}`,
          id: group.key,
        })),
        highlightScope: { highlight: "item", fade: "global" },
      },
    ],
    height: 400,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };


  return (
    <div className="diagram">
      <h3>Sales of the Year</h3>
      <Stack
        className="chart"
        direction={{ xs: "column", xl: "row" }}
        spacing={1}
        sx={{ width: "100%" }}
      >
        <BarChart
          {...barChartProps}
          highlightedItem={highlightedItem}
          onHighlightChange={setHighLightedItem}
        />
        <PieChart
          className="pieChart"
          {...pieChartProps}
          highlightedItem={highlightedItem}
          onHighlightChange={setHighLightedItem}
        />
      </Stack>
    </div>
  );
}

export default TotalSales;
