import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useExpenses, useGoals } from "../../hooks/useExpenses";

const PieChart = () => {
  const { data: expenses, isLoading } = useExpenses();
  console.log("expenses ", expenses);

  const predefinedCategories = [
    "fuel",
    "hospital",
    "food",
    "clothing",
    "other",
  ];

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
          colors: "black",
        },
        offsetY: 20,
        itemMargin: {
          vertical: 4,
          horizontal: 12,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
       responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              show: true,
              offsetY: 0,
              labels: {
                colors: "black",
              },
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

    expenses?.forEach((item) => {
      if (item.category && categoryTotals.hasOwnProperty(item.category)) {
        const amount = parseFloat(item.amount);
        if (!isNaN(amount)) {
          categoryTotals[item.category] += amount;
        }
      }
    });

    const totalAmount = Object.values(categoryTotals).reduce(
      (sum, value) => sum + value,
      0
    );

    const series = Object.values(categoryTotals).map((value) => {
      if (totalAmount > 0) {
        return ((value / totalAmount) * 100).toFixed(2);
      }
      return 0;
    });

    const labels = predefinedCategories.map((category) =>
      category.toUpperCase()
    );

    setPieChart((prevChart) => ({
      ...prevChart,
      series: series.map(Number),
      options: { ...prevChart.options, labels },
    }));
  };

  useEffect(() => {
    if (Array.isArray(expenses)) {
      getChartData();
    }
  }, [expenses]);

  if (!expenses) {
    return <div>Loading chart...</div>;
  }

  if (pieChart.series.length === 0 || pieChart.options.labels.length === 0) {
    return <div>No data available for chart</div>;
  }

  return (
    <div className="mt-10 p-4 rounded-lg items-center md:items-start md:flex-row flex flex-col w-full ">
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
