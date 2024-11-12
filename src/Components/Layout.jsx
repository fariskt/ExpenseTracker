import React, { useContext, useEffect, useState } from "react";
import SideBar from "./Sidebar/SideBar";
import DashBoard from "./DashBoard";
import ExpenseDetails from "../Pages/Expenses/ExpenseDetails";
import TripDetails from "../Pages/Trips/TripDetails";
import AppContext from "../context/AppContext";

const Layout = () => {
  
  const [activePage, setActivePage] = useState("dashboard");
  const Pages = {
    dashboard: <DashBoard />,
    expenses: <ExpenseDetails />,
    trip: <TripDetails/>
  };

  return (
    <>
      <SideBar setActivePage={setActivePage} activePage={activePage} />
      <div className="h-[100vh] bg-[#040913]">
        {Pages[activePage] || <DashBoard />}
      </div>
    </>
  );
};

export default Layout;
