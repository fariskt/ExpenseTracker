import RecentExpenses from "../Pages/Dashboard/RecentExpenses";
import QuickAccess from "../Pages/Dashboard/QuickAccess";
import GoalsPreview from "../Pages/Dashboard/GoalsPreview";
import BudgetPreview from "../Pages/Dashboard/BudgetPreview";

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-8 pt-20 pl-4 md:pl-80 mx-auto bg-[#040913] w-screen">
      <QuickAccess />
      <div className="md:w-full">
        <RecentExpenses />
      </div>
      <GoalsPreview />
      <BudgetPreview/>
    </div>
  );
};

export default DashBoard;
