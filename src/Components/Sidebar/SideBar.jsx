import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBag } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

const SideBar = ({ setActivePage, activePage }) => {
  return (
    <div className="fixed top-0 flex flex-col justify-between bg-[#0f172a] border-gray-400 w-[250px] h-full left-0 p-4 ">
      <div className="flex flex-col gap-4 h-full pl-4">
        <div className="flex flex-col gap-4 items-center my-6">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://media.istockphoto.com/id/467555084/photo/silhouette-girl-portrait.jpg?s=612x612&w=0&k=20&c=oVEy3rsRiDsNNENKckxk6MselXjBsaR987BKLWjymdk="
            alt=""
          />
          <h5>Name</h5>
        </div>
        <h4
          onClick={() => setActivePage("dashboard")}
          className={` ${
            activePage === "dashboard" && "bg-gray-700 text-blue-400"
          } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
        >
          <span>
            <LuLayoutDashboard />
          </span>
          Dashboard
        </h4>
        <h4
          onClick={() => setActivePage("expenses")}
          className={` ${
            activePage === "expenses" && "bg-gray-700 text-blue-400"
          } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
        >
          <span>
            <BsBag />
          </span>
          Expenses
        </h4>
        <h4
          onClick={() => setActivePage("trip")}
          className={`${
            activePage === "trip" && "bg-gray-700 text-blue-400"
          } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
        >
          <span>
            <GoGoal />
          </span>
          Trips
        </h4>
        <h4 className="flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150">
          <span>
            <TbBrandGoogleAnalytics />
          </span>
          Analytics
        </h4>
      </div>
      <div className="ml-4 mb-4">
        <h4 className="flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150">
          <span>
            <IoSettingsOutline />
          </span>
          Settings
        </h4>
      </div>
    </div>
  );
};

export default SideBar;
