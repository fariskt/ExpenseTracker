import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsBag } from 'react-icons/bs';
import { GoGoal } from 'react-icons/go';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { useAuthStore } from '../../store/useAuthStore';

const SideBar = ({ setActivePage, activePage }) => {
  const { user } = useAuthStore();


  return (
    <div className="md:flex md:fixed md:top-0 left-0 md:flex-col bg-[#0f172a] border-gray-400 md:w-[250px] md:h-full md:z-20 md:p-4">
      <div className="flex flex-col items-center my-6 gap-4">
        <img
          className="h-20 w-20 rounded-full object-cover"
          src="https://media.istockphoto.com/id/467555084/photo/silhouette-girl-portrait.jpg?s=612x612&w=0&k=20&c=oVEy3rsRiDsNNENKckxk6MselXjBsaR987BKLWjymdk="
          alt="User"
        />
        <h5>{user ? user.name : 'username'}</h5>
      </div>
      <nav className="flex flex-col gap-4 mt-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
          onClick={() => setActivePage('')}
        >
          <LuLayoutDashboard /> <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
          onClick={() => setActivePage('expenses')}
        >
          <BsBag /> <span>Expenses</span>
        </NavLink>
        <NavLink
          to="/trips"
          className={({ isActive }) =>
            `cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
          onClick={() => setActivePage('trips')}
        >
          <GoGoal /> <span>Trips</span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
          onClick={() => setActivePage('analytics')}
        >
          <TbBrandGoogleAnalytics /> <span>Analytics</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;