import React, { useContext, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { CiReceipt } from "react-icons/ci";
import { TbReportAnalytics } from "react-icons/tb";
import { BiTrip } from "react-icons/bi";
import ExpenseFormModal from "./Forms/ExpenseForm";
import TripFormModal from "./Forms/TripForm";
import useUIStore from "../../store/useUIForm";

const QuickAccess = () => {
  const { showForm, setShowForm } = useUIStore();
  return (
    <>
      {showForm === "expenseform" && (
        <ExpenseFormModal setShowForm={setShowForm} />
      )}
      {showForm === "trip" && <TripFormModal setShowForm={setShowForm} />}
      <div
        className=" w-[95%]  rounded-xl shadow-2xl relative border border-blue-500/20"
        style={{
          background: "rgba(17, 24, 39, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <h1 className="border-b border-gray-700 p-2 text-base">Quick Access</h1>
        <div className="flex flex-wrap gap-2 justify-around items-center h-full w-full py-8 px-2">
          <div
            className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-2 md:p-4 rounded-md cursor-pointer"
            onClick={() => setShowForm("expenseform")}
          >
            <span className="rounded-full bg-red-500 p-2 md:p-3">
              <IoWalletOutline />
            </span>
            <h3 className="font-bold text-sm">+ New Expense</h3>
          </div>
          <div
            className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-2 md:p-4 rounded-md cursor-pointer"
            onClick={() => setShowForm("trip")}
          >
            <span className="rounded-full bg-blue-500 p-2 md:p-3">
              <BiTrip />
            </span>
            <h3 className="font-bold text-sm">+ Create trip</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickAccess;
