import React from "react";
import ReactApexChart from "react-apexcharts";
import { useBudgets, useGoals } from "../../../hooks/useExpenses";

const GoalComparisonBarChart = () => {
  const { data: goals } = useGoals();

  const getBudgetForGoal = (goalName) => {
    const match = budgets?.find(
      (b) => b.category.toLowerCase() === goalName.toLowerCase()
    );
    return match ? match.limit : 0;
  };

  const categories = goals?.map((goal) => goal.name);

  const series = [
    {
      name: "Saved",
      data: goals?.map((goal) => goal.saved),
    },
    {
      name: "Target",
      data: goals?.map((goal) => goal.target),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },

    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val}`,
      },
    },
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">Goal vs Saved</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default GoalComparisonBarChart;
