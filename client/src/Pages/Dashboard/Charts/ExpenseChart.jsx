import DayExpenseChart from "./DayExpenseChart";

const ExpenseChart = () => {
  return (
    <div className="border border-gray-400 rounded-lg ">
      <h2 className=" py-4 pl-4 border-b border-gray-400">Weekly report</h2>
      <div className="md:p-8">
        <DayExpenseChart />
      </div>
    </div>
  );
};

export default ExpenseChart;
