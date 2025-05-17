import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuGoal, LuLayoutDashboard } from "react-icons/lu";
import { BsBag } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoBagHandleOutline } from "react-icons/io5";
import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";
const SideBar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const { user } = useAuthStore();
  return (
    <div className="md:fixed md:top-0 md:left-0 flex flex-col items-center justify-between bg-black/90 backdrop-blur-md shadow-lg md:w-20 md:h-full z-20 py-6 space-y-6 border-r border-gray-700">
      <nav className="flex flex-col gap-6 mt-10">
        <NavItem to="/" icon={<LuLayoutDashboard />} label="Dashboard" />
        <NavItem to="/expenses" icon={<BsBag />} label="Expenses" />
        <NavItem to="/goals" icon={<LuGoal />} label="Goals" />
        <NavItem to="/budget" icon={<IoBagHandleOutline />} label="Budget" />
        <NavItem
          to="/analytics"
          icon={<TbBrandGoogleAnalytics />}
          label="Analytics"
        />
      </nav>
      <img
        onClick={() => setOpenProfile(!openProfile)}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500"
        src="https://media.istockphoto.com/id/467555084/photo/silhouette-girl-portrait.jpg?s=612x612&w=0&k=20&c=oVEy3rsRiDsNNENKckxk6MselXjBsaR987BKLWjymdk="
        alt="User"
      />
      {openProfile && (
        <motion.div
          initial={{ y: 300, rotate: -15, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.8,
          }}
          className="fixed bottom-4 left-[70px] w-52 bg-[#1a1a2e]/90 backdrop-blur-md text-white rounded-2xl shadow-[0_0_20px_rgba(138,43,226,0.4)] border border-gray-700 p-5"
        >
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold tracking-wide text-purple-300">
              {user.name}
            </h2>

            <button
              // onClick={handleLogout}
              className="w-full py-2 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 hover:from-red-700 hover:to-pink-700 rounded-full text-sm font-medium tracking-wide shadow-lg hover:shadow-red-500/40 transition duration-300"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group flex items-center justify-center p-3 rounded-xl transition-colors duration-300
         ${
           isActive
             ? "bg-blue-600 text-white"
             : "hover:bg-blue-500/20 text-gray-300"
         }`
      }
    >
      {icon}
      <span className="absolute left-full ml-6 hidden group-hover:block bg-gray-900 text-white text-sm px-2 py-1 rounded-md shadow-lg z-10 whitespace-nowrap">
        {label}
      </span>
    </NavLink>
  );
};

export default SideBar;
