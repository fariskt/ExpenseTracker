import { IoBagHandleOutline, IoWalletOutline } from "react-icons/io5";
import ExpenseFormModal from "./Forms/ExpenseForm";
import useUIStore from "../../store/useUIForm";
import { LuGoal } from "react-icons/lu";
import GoalFormModal from "./Forms/GoalForm";
import BudgetFormModal from "./Forms/BudgetForm";
import QuickAccessCard from "../../Components/ui/QuickAcessCard";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

const QuickAccess = () => {
  const { showForm, setShowForm } = useUIStore();
  const quickAccess = [
    { type: "expenses", icon: <IoWalletOutline />, text: "New Expense" },
    { type: "budget", icon: <IoBagHandleOutline />, text: "Set Budget" },
    { type: "goal", icon: <LuGoal />, text: "New Goal" },
    { type: "analytics", icon: <TbBrandGoogleAnalytics />, text: "Analytics" },
  ];

  return (
    <>
      {showForm === "expenses" && (
        <ExpenseFormModal setShowForm={setShowForm} />
      )}
      {showForm === "goal" && <GoalFormModal setShowForm={setShowForm} />}
      {showForm === "budget" && <BudgetFormModal setShowForm={setShowForm} />}
      <div className="container border border-gray-700 rounded-lg w-[95%] md:w-[95%] bg-[#0f172a] min-h-[200px] md:max-h-[230px] overflow-y-auto scroll-bar">
        <h1 className="border-b  md:static absolute md:w-full w-[91%] border-gray-700 p-2 text-base">Quick Access</h1>
        <div className="flex mt-10 md:mt-0 gap-6 md:justify-around  px-2 py-8 w-full ">
          {quickAccess.map((item, index) => (
            <QuickAccessCard quickAccess={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickAccess;
