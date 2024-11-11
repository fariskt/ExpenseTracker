import React from "react";
import DayExpenseChart from "./DayExpenseChart";
import MonExpenseChart from "./MonExpenseChart";

const ExpenseChart = () => {
  return (
    <div className="border border-gray-700 bg-[#0f172a] rounded-lg w-[90%]">
      <h2 className=" py-4 pl-4 border-b border-gray-700">Monthly report</h2>
      <div className="flex gap-10 w-[90%]  p-4">
        <DayExpenseChart />
        <MonExpenseChart />
      </div>
    </div>
  );
};

export default ExpenseChart;
