import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AppContext from "../../../context/AppContext";

const DayExpenseChart = () => {
  const { expenses } = useContext(AppContext);

  const [dayToDayExpense, setDayToDayExpense] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 400,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      colors: [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33A1",
        "#FFA533",
        "#33FFF5",
        "#F533FF",
      ],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
        labels: {
          colors: "white",
        },
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        labels: {
          style: {
            colors: "white",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        min: 0,
        max: 5000,
        tickAmount: 5,
        labels: {
          style: {
            colors: "white",
            fontSize: "14px",
          },
        },
        title: {
          style: {
            color: "white",
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  });

  const getAmountOfDay = (day) => {
    const categories = ["fuel", "hospital", "food", "clothing", "other"];
    return categories.map((category) => {
      return expenses
        .filter((item) => item.category === category && item.day === day)
        .reduce((acc, val) => acc + parseFloat(val.amount), 0);
    });
  };

  useEffect(() => {
    const categories = ["Fuel", "Hospital", "Food", "Clothing", "Other"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const seriesData = categories.map((item,index)=> ({
      name: item,
      data: days.map((day)=> getAmountOfDay(day)[index])
    }))
    setDayToDayExpense((prev) => ({
      ...prev,
     series: seriesData
    }));
  }, [expenses]);

  return (
    <div className="bg-gray-800 rounded-md text-black md:w-[500px] md:h-[350px]">
      <h3 className="text-white py-2 pl-4">Day-to-Day Expenses</h3>
      <ReactApexChart
        options={dayToDayExpense.options}
        series={dayToDayExpense.series}
        type="bar"
      />
    </div>
  );
};

export default DayExpenseChart;
