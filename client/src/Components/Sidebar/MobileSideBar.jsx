import {useState } from "react";
import { LuGoal, LuLayoutDashboard } from "react-icons/lu";
import { BsBag } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMenu, IoCloseSharp, IoBagHandleOutline } from "react-icons/io5";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useLocation, useParams } from "react-router-dom";

const MobileSideBar = () => {
  const { user } = useAuthStore();
  
  const {pathname} = useLocation()
  
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  return (
    <>
      <div className="fixed top-0 w-screen md:w-full h-16 bg-gray-900 z-30 flex items-center justify-between px-4 md:hidden">
        <button
          onClick={() => setShowMobileSideBar(!showMobileSideBar)}
          className="text-3xl"
        >
          {showMobileSideBar ? <IoCloseSharp /> : <IoMenu />}
        </button>
        <p className="text-2xl">
          <CgProfile />
        </p>
      </div>
      {showMobileSideBar && (
        <div className="fixed top-10  rounded-lg flex flex-col justify-between bg-[#182134]  border-gray-400 z-20 w-[350px] min-h-screen h-full left-0 p-4">
          <div className="flex flex-col gap-4 h-full pl-4">
            <div className="flex flex-col gap-4 items-center my-6">
              <img
                className="h-20 w-20 rounded-full object-cover"
                src="https://media.istockphoto.com/id/467555084/photo/silhouette-girl-portrait.jpg?s=612x612&w=0&k=20&c=oVEy3rsRiDsNNENKckxk6MselXjBsaR987BKLWjymdk="
                alt=""
              />
              <h5>{user ? user.name : "username"}</h5>
            </div>
            <Link
            to="/"
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
              }}
              className={` ${
                pathname === "/" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <LuLayoutDashboard />
              </span>
              Dashboard
            </Link>
            <Link
            to="/expenses"
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
              }}
              className={` ${
                pathname === "/expenses" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <BsBag />
              </span>
              Expenses
            </Link>
            <Link
            to="/goals"
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
              }}
              className={`${
                pathname === "/goals" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <LuGoal />
              </span>
              Goals
            </Link>
            <Link
            to="/budget"
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
              }}
              className={`${
                pathname === "/budget" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <IoBagHandleOutline />
              </span>
              Budget
            </Link>
            <Link
            to="/analytics"
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
              }}
              className={`${
                pathname === "/analytic" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <TbBrandGoogleAnalytics />
              </span>
              Analytics
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSideBar;
