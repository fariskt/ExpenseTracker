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

const SideBar = () => {
  const { user } = useAuthStore();

  return (
    <div className="md:fixed md:top-0 md:left-0 flex flex-col items-center justify-between bg-[#0f172a]/80 backdrop-blur-md shadow-lg md:w-20 md:h-full z-20 py-6 space-y-6 border-r border-gray-700">

      <nav className="flex flex-col gap-6 mt-10">
        <NavItem to="/" icon={<LuLayoutDashboard />} label="Dashboard" />
        <NavItem to="/expenses" icon={<BsBag />} label="Expenses" />
        <NavItem to="/goals" icon={<LuGoal />} label="Goals" />
        <NavItem to="/budget" icon={<IoBagHandleOutline />} label="Budget" />
        <NavItem to="/analytics" icon={<TbBrandGoogleAnalytics />} label="Analytics" />
      </nav>
      <img
        className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500"
        src="https://media.istockphoto.com/id/467555084/photo/silhouette-girl-portrait.jpg?s=612x612&w=0&k=20&c=oVEy3rsRiDsNNENKckxk6MselXjBsaR987BKLWjymdk="
        alt="User"
      />
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group flex items-center justify-center p-3 rounded-xl transition-colors duration-300
         ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500/20 text-gray-300"}`
      }
    >
      {icon}
      <span className="absolute left-full ml-3 hidden group-hover:block bg-gray-900 text-white text-sm px-2 py-1 rounded-md shadow-lg z-10 whitespace-nowrap">
        {label}
      </span>
    </NavLink>
  );
};

export default SideBar;
