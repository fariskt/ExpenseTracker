import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AppContext from "../../../context/AppContext";

const MonExpenseChart = () => {
  const { expenses } = useContext(AppContext);
  const [monthlyExpense, setMonthlyExpenses] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        width: "100%",
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "white",
            fontSize: "12px",
          },
          rotate: -45,
        },
        scrollbar: {
          enabled: true,
        },
      },
      yaxis: {
        min: 0,
        max: 10000,
        tickAmount: 5,
        labels: {
          style: {
            fontSize: "14px",
            colors: "white",
          },
        },
      },
    },
  });

  const getMonthlyTotal = (expenses) => {
    const monthlyTotals = Array(12).fill(0);
    expenses.forEach(({ amount, date }) => {
      const monthIndex = new Date(date).getMonth();
      monthlyTotals[monthIndex] += parseFloat(amount);
    });
    return monthlyTotals;
  };

  useEffect(() => {
    const monthlyTotal = getMonthlyTotal(expenses);    
    setMonthlyExpenses((prev) => ({
      ...prev,
      series: [{ name: "Expenses", data: monthlyTotal }],
    }));
  }, [expenses]);

  return (
    <div className="bg-gray-800 rounded-md text-black md:w-[500px] md:h-[350px]">
      <h3 className="text-white pt-2 pl-4">Monthly Expenses</h3>
      <ReactApexChart
        options={monthlyExpense.options}
        series={monthlyExpense.series}
        type="bar"
      />
    </div>
  );
};

export default MonExpenseChart;
