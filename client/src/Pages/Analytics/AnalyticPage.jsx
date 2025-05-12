import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AppContext from "../../context/AppContext";
import PieChart from "./PieChart";

const AnalyticPage = () => {
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
      colors: ["#33FF57"],
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
        max: 30000,
        tickAmount: 6,
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
const [loading, setLoading] = useState(true);

useEffect(() => {
  if (expenses && expenses.length > 0) {
    const monthlyTotal = getMonthlyTotal(expenses);
    setMonthlyExpenses((prev) => ({
      ...prev,
      series: [{ name: "Expenses", data: monthlyTotal }],
    }));
    setLoading(false);
  }
}, [expenses]);

if (loading) {
  return <div>Loading...</div>;
}



  return (
    <div className="mt-24 md:mt-10 md:ml-72 mx-auto bg-gray-900 md:w-[80%] w-screen md:p-10 p-1">
      <h1 className="text-3xl py-5">Analytics</h1>
      <div className="bg-gray-800 rounded-md text-black ">
        <h3 className="text-white py-4 pl-4">Monthly Expenses (2024)</h3>
        <ReactApexChart
          options={monthlyExpense.options}
          series={monthlyExpense.series}
          height={300}
          type="bar"
        />
      </div>
        <PieChart/>
    </div>
  );
};

export default AnalyticPage;
