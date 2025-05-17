import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PieChart from "./PieChart";
import { useExpenses, useGoals } from "../../hooks/useExpenses";
import ExpenseChart from "../../Pages/Dashboard/Charts/ExpenseChart";
import GoalChart from "../Dashboard/Charts/GoalChart";
import SplineAreaChart from "../Dashboard/Charts/SavedvsTarget";
import BudgetTrackingChart from "../Dashboard/Charts/BudgetChart";
const AnalyticPage = () => {
  const { data: expenses } = useExpenses();
  const { data: goals } = useGoals();
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
  console.log(expenses);

  const getMonthlyTotal = (expenses) => {
    const monthlyTotals = Array(12).fill(0);
    expenses?.forEach(({ amount, date }) => {
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

  return (
    <div className="mt-24 md:mt-10 mx-auto text-black md:w-[90%] w-full px-4 md:px-10 py-8">
      <h1 className="text-3xl font-bold py-5 text-center md:text-left">
        📊 Analytics Dashboard
      </h1>

      <div className="mb-8 rounded-xl p-5 box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
">
        <h2 className="text-xl font-semibold mb-4">Expense Overview</h2>
        <ExpenseChart />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mx-5 ">
        <div className=" rounded-xl p-5 border border-gray-400">
          <h2 className="text-xl font-semibold mb-4">Spending Trend</h2>
          <SplineAreaChart />
        </div>

        <div className=" rounded-xl p-5 border border-gray-400 ">
          <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticPage;
