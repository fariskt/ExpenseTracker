import { IoBagHandleOutline, IoWalletOutline } from "react-icons/io5";
import { BiTrip } from "react-icons/bi";
import ExpenseFormModal from "./Forms/ExpenseForm";
import TripFormModal from "./Forms/TripForm";
import useUIStore from "../../store/useUIForm";
import { LuGoal } from "react-icons/lu";
import GoalFormModal from "./Forms/GoalForm";
import BudgetFormModal from "./Forms/BudgetForm";
import QuickAccessCard from "../../Components/ui/QuickAcessCard";

const QuickAccess = () => {
  const { showForm, setShowForm } = useUIStore();
  const quickAccess = [
    {type: "expenses", icon: <IoWalletOutline/> , text: "New Expense"},
    {type: "budget", icon: <IoBagHandleOutline/> , text: "Set Budget"},
    {type: "goal", icon: <LuGoal/> , text: "New Goal"},
    {type: "trip", icon: <BiTrip/> , text: "Add Trip Plan"},
  ]

  return (
    <>
      {showForm === "expenses" && (
        <ExpenseFormModal setShowForm={setShowForm} />
      )}
      {showForm === "trip" && <TripFormModal setShowForm={setShowForm} />}
      {showForm === "goal" && <GoalFormModal setShowForm={setShowForm} />}
      {showForm === "budget" && <BudgetFormModal setShowForm={setShowForm} />}
      <div className="container border border-gray-700 rounded-lg w-[95%] md:w-[95%] bg-[#0f172a] min-h-[200px] max-h-[230px] overflow-y-auto scroll-bar">
        <h1 className="border-b border-gray-700 p-2 text-base">Quick Access</h1>
        <div className="flex flex-wrap gap-2 justify-around items-center h-full w-full py-8 px-2">
          {quickAccess.map((item,index)=> (
            <QuickAccessCard quickAccess={item} key={index}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickAccess;
