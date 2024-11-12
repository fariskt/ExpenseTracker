import React from "react";
import DayExpenseChart from "./DayExpenseChart";
import MonExpenseChart from "./MonExpenseChart";

const ExpenseChart = () => {
  return (
    <div className="border border-gray-700 bg-[#0f172a] rounded-lg w-[95%]">
      <h2 className=" py-4 pl-4 border-b border-gray-700">Monthly report</h2>
      <div className="flex flex-col md:flex-row gap-10 w-full md:w-[100%]  p-4">
        <DayExpenseChart />
        <MonExpenseChart />
      </div>
    </div>
  );
};

export default ExpenseChart;
