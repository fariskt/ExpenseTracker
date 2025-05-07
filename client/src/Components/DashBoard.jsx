import React from "react";
import ExpenseChart from "../Pages/Dashboard/Charts/ExpenseChart";
import RecentExpenses from "../Pages/Dashboard/RecentExpenses";
import QuickAccess from "../Pages/Dashboard/QuickAccess";

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-8 pt-20 pl-4 md:pl-80 mx-auto bg-[#040913]">
      <QuickAccess />
      <div className="md:w-full">
        <RecentExpenses />
      </div>
      <ExpenseChart />
    </div>
  );
};

export default DashBoard;
