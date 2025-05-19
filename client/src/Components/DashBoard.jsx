import RecentExpenses from "../Pages/Dashboard/RecentExpenses";
import QuickAccess from "../Pages/Dashboard/QuickAccess";
import GoalsPreview from "../Pages/Dashboard/GoalsPreview";
import BudgetTrackingChart from "../Pages/Dashboard/Charts/BudgetChart";
import Navbar from "./Navbar";
import { useAuthStore } from "../store/useAuthStore";
import ProgressLoader from "./ui/ProgressLoader";

const DashBoard = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ProgressLoader />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-8 pt-5 pl-4 md:pl-32 mx-auto ">
        <Navbar />
        <QuickAccess />
        <div className="md:w-full">
          <RecentExpenses />
        </div>
        <GoalsPreview />
        <BudgetTrackingChart />
      </div>
    </>
  );
};

export default DashBoard;
