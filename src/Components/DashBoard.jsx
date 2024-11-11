import React from "react";
import ExpenseChart from "../Pages/Dashboard/Charts/ExpenseChart";
import RecentExpenses from "../Pages/Dashboard/RecentExpenses";
import QuickAccess from "../Pages/Dashboard/QuickAccess";
import PendingTask from "../Pages/Dashboard/PendingTask";

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-8 pt-20 pl-80 mx-auto bg-[#040913]">
      <QuickAccess />
      <div className="flex justify-between w-[90%]">
        <RecentExpenses />
        <PendingTask/>
      </div>
      <ExpenseChart />
    </div>
  );
};

export default DashBoard;
