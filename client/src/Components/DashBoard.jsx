import RecentExpenses from "../Pages/Dashboard/RecentExpenses";
import QuickAccess from "../Pages/Dashboard/QuickAccess";
import GoalsPreview from "../Pages/Dashboard/GoalsPreview";
import BudgetTrackingChart from "../Pages/Dashboard/Charts/BudgetChart";

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-8 pt-20 pl-4 md:pl-32 mx-auto ">
      <QuickAccess />
      <div className="md:w-full">
        <RecentExpenses />
      </div>
      <GoalsPreview />
      <BudgetTrackingChart />
    </div>
  );
};

export default DashBoard;
