import React, { useContext } from "react";
import { IoIosTimer } from "react-icons/io";
import { IoMdAirplane } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import AppContext from "../../context/AppContext";


const PendingTask = () => {
  const {expenses,tripDetails} = useContext(AppContext)
  return (
    <div className="container border border-gray-700 rounded-lg w-[500px] bg-[#0f172a]">
      <h1 className="text-base mb-4 border-b border-gray-700 p-2">
        Pending Task
      </h1>
      <div className="pr-8 font-light">
        <div className="flex justify-between items-center">
          <div className="flex pb-2 px-4 gap-4 items-center">
            <span className="text-violet-600 font-extrabold text-xl">
              <IoIosTimer />
            </span>
            <p>Pending Approvals</p>
          </div>
          <h4 className="font-bold">1</h4>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex py-2 px-4 gap-4 items-center">
            <span className="text-violet-600 font-extrabold text-xl">
              <IoMdAirplane />
            </span>
            <p>New Trips Planned</p>
          </div>
          <h4 className="font-bold">{tripDetails.length > 0 ? tripDetails.length : 0}</h4>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex py-2 px-4 gap-4 items-center">
            <span className="text-violet-600 font-extrabold text-xl"> 
              <MdShoppingCartCheckout />
            </span>
            <p>Upcoming Expenses</p>
          </div>
          <h4 className="font-bold">{expenses ? expenses.length : 0}</h4>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex py-2 px-4 gap-4 items-center">
            <span className="text-violet-600 font-extrabold text-xl">
              <FaRegCreditCard />
            </span>
            <p>Unreported Expenses</p>
          </div>
          <h4 className="font-bold">14</h4>
        </div>
      </div>
    </div>
  );
};

export default PendingTask;
