import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBag } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const SideBar = ({ setActivePage, activePage }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      const enteredName = prompt("Please enter your name:");
      if (enteredName) {
        localStorage.setItem("userName", enteredName);
        setUserName(enteredName);
      }
    } else {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
      <div className="fixed h-16 w-full top-0 bg-gray-900  z-30 md:hidden ">
        <p
          className="absolute w-full pt-3 pl-4 opacity-80 text-4xl"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          {showSideBar ? <IoCloseSharp /> : <IoMenu />}
        </p>
        <p className="text-2xl float-right pr-4 pt-5">
          <CgProfile />
        </p>
      </div>
      {!showSideBar && (
        <div className="fixed top-10 md:top-0 rounded-lg flex flex-col justify-between bg-[#182134] md:bg-[#0f172a] border-gray-400 w-[350px] z-20 md:w-[250px] min-h-screen md:h-full left-0 p-4 ">
          <div className="flex flex-col gap-4 h-full pl-4">
            <div className="flex flex-col gap-4 items-center my-6">
              <img
                className="h-20 w-20 rounded-full object-cover"
                src="https://media.istockphoto.com/id/467555084/photo/silhouette-girl-portrait.jpg?s=612x612&w=0&k=20&c=oVEy3rsRiDsNNENKckxk6MselXjBsaR987BKLWjymdk="
                alt=""
              />
              <h5>{userName ? userName : "username"}</h5>
            </div>
            <h4
              onClick={() => {
                setActivePage("dashboard");
                setShowSideBar(false);
              }}
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
              onClick={() => {
                setActivePage("expenses");
                setShowSideBar(false);
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
                setShowSideBar(false);
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
              Logout
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
