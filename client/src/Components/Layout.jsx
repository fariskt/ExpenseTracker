import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar/SideBar";
import DashBoard from "./DashBoard";
import ExpenseDetails from "../Pages/Expenses/ExpenseDetails";
import TripDetails from "../Pages/Trips/TripDetails";
import MobileSideBar from "./Sidebar/MobileSideBar";
import AnalyticPage from "../Pages/Analytics/AnalyticPage";

const Layout = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Pages = {
    dashboard: <DashBoard />,
    expenses: <ExpenseDetails />,
    trip: <TripDetails />,
    analytic : <AnalyticPage/>
  };

  return (
    <div className="flex min-h-screen">
      {isMobile ? (
        <MobileSideBar setActivePage={setActivePage} activePage={activePage} />
      ) : (
        <SideBar setActivePage={setActivePage} activePage={activePage} />
      )}

      <div className="flex-1 bg-[#040913] pb-10">
        {Pages[activePage] || <DashBoard />}
      </div>
    </div>
  );
};

export default Layout;
