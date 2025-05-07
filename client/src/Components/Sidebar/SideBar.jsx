import React, { useContext } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBag } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import AppContext from "../../context/AppContext";

const SideBar = ({ setActivePage, activePage }) => {
  const { userName } = useContext(AppContext);

  return (
    <>
      <div className=" md:flex md:fixed md:top-0 left-0 md:flex-col bg-[#0f172a] border-gray-400 md:w-[250px] md:h-full md:z-20 md:p-4">
        <div className="flex flex-col items-center my-6 gap-4">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://media.istockphoto.com/id/467555084/photo/silhouette-girl-portrait.jpg?s=612x612&w=0&k=20&c=oVEy3rsRiDsNNENKckxk6MselXjBsaR987BKLWjymdk="
            alt="User"
          />
          <h5>{userName || "username"}</h5>
        </div>
        <nav className="flex flex-col gap-4 mt-10">
          <h4
            onClick={() => setActivePage("dashboard")}
            className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
              activePage === "dashboard" ? "bg-gray-700 text-blue-400" : ""
            }`}
          >
            <LuLayoutDashboard /> Dashboard
          </h4>
          <h4
            onClick={() => setActivePage("expenses")}
            className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
              activePage === "expenses" ? "bg-gray-700 text-blue-400" : ""
            }`}
          >
            <BsBag /> Expenses
          </h4>
          <h4
            onClick={() => setActivePage("trip")}
            className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
              activePage === "trip" ? "bg-gray-700 text-blue-400" : ""
            }`}
          >
            <GoGoal /> Trips
          </h4>
          <h4
            onClick={() => setActivePage("analytic")}
            className={`${
              activePage === "analytic" && "bg-gray-700 text-blue-400"
            } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
          >
            <TbBrandGoogleAnalytics /> Analytics
          </h4>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
