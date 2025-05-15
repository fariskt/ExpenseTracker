import {useState } from "react";
import { LuGoal, LuLayoutDashboard } from "react-icons/lu";
import { BsBag } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { useAuthStore } from "../../store/useAuthStore";

const MobileSideBar = ({ setActivePage, activePage }) => {
  const { user } = useAuthStore();
  console.log("=================",user);
  
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
            <h4
              onClick={() => {
                setActivePage("dashboard");
                setShowMobileSideBar(!showMobileSideBar);
              }}
              className={` ${
                activePage === "" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <LuLayoutDashboard />
              </span>
              Dashboard
            </h4>
            <h4
              onClick={() => {
                setActivePage("expenses");
                setShowMobileSideBar(!showMobileSideBar);
              }}
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
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
                setActivePage("trip");
              }}
              className={`${
                activePage === "trip" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <GoGoal />
              </span>
              Trips
            </h4>
            <h4
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
                setActivePage("goals");
              }}
              className={`${
                activePage === "goals" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <LuGoal />
              </span>
              Goals
            </h4>
            <h4
              onClick={() => {
                setShowMobileSideBar(!showMobileSideBar);
                setActivePage("analytic");
              }}
              className={`${
                activePage === "analytic" && "bg-gray-700 text-blue-400"
              } flex items-center gap-2 text-base cursor-pointer hover:bg-gray-800 p-2 rounded-md duration-150`}
            >
              <span>
                <TbBrandGoogleAnalytics />
              </span>
              Analytics
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSideBar;
