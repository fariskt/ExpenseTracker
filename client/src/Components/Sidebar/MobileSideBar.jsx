import React from "react";
import { NavLink } from "react-router-dom";
import {
  LuGoal,
  LuLayoutDashboard,
} from "react-icons/lu";
import { BsBag } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoBagHandleOutline } from "react-icons/io5";
import { useAuthStore } from "../../store/useAuthStore";

const MobileSideBar = () => {
  const { user } = useAuthStore();

  return (
    <div className="fixed bottom-0 w-full md:left-0 flex  items-center justify-between bg-[#0f172a]/80 backdrop-blur-md shadow-lg md:w-20 md:h-full z-20 pb-2 space-y-2 border-r border-gray-700">
      <nav className="flex justify-center w-full gap-6 items-center mt-5">
        <NavItem to="/" icon={<LuLayoutDashboard />} label="Dashboard" />
        <NavItem to="/expenses" icon={<BsBag />} label="Expenses" />
        <NavItem to="/goals" icon={<LuGoal />} label="Goals" />
        <NavItem to="/budget" icon={<IoBagHandleOutline />} label="Budget" />
        <NavItem to="/analytics" icon={<TbBrandGoogleAnalytics />} label="Analytics" />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group flex items-center justify-center p-3 rounded-xl transition-colors duration-300
         ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500/20 text-gray-300"}`
      }
    >
      {icon}
    </NavLink>
  );
};

export default MobileSideBar;
