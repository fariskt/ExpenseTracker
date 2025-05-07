import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AppContext from "../../context/AppContext";

const PieChart = () => {
  const { expenses } = useContext(AppContext);

  const predefinedCategories = ["fuel", "hospital", "food", "clothing", "other"];

  const [pieChart, setPieChart] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      dataLabels: {
        formatter: (val) => `${val.toFixed(2)}%`,
        style: {
          colors: ["#FFFFFF"],
        },
      },
      legend: {
        labels: {
          colors: "#FFFFFF",
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
      responsive: [
        {
          breakpoint: 400,
          options: {
            chart: { width: 300 },
            legend: {
              position: "bottom",
              labels: { colors: "#FFFFFF" },
            },
          },
        },
      ],
    },
  });

  const getChartData = () => {
    const categoryTotals = predefinedCategories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});
    

    expenses.forEach((item) => {
      if (item.category && categoryTotals.hasOwnProperty(item.category)) {
        const amount = parseFloat(item.amount);
        if (!isNaN(amount)) {
          categoryTotals[item.category] += amount;
        }
      }
    });

    const totalAmount = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

    const series = Object.values(categoryTotals).map((value) => {
      if (totalAmount > 0) {
        return ((value / totalAmount) * 100).toFixed(2);
      }
      return 0;
    });

    const labels = predefinedCategories.map((category) => category.toUpperCase());

    setPieChart((prevChart) => ({
      ...prevChart,
      series: series.map(Number),
      options: { ...prevChart.options, labels },
    }));
  };

  useEffect(() => {
    getChartData();
  }, [expenses]);

  return (
    <div className="mt-10 bg-slate-800 p-4 rounded-lg items-center md:items-start md:flex-row flex flex-col">
      <h2 className="my-4 ml-4 text-white">Expense Categories</h2>
      <ReactApexChart
        options={pieChart.options}
        series={pieChart.series}
        type="pie"
        height={400}
        width={400}
      />
    </div>
  );
};

export default PieChart;
