import DayExpenseChart from "./DayExpenseChart";

const ExpenseChart = () => {
  return (
    <div className="border border-gray-700 bg-[#0f172a] rounded-lg w-[95%]">
      <h2 className=" py-4 pl-4 border-b border-gray-700">Monthly report</h2>
      <div className="md:p-8">
        <DayExpenseChart />
      </div>
    </div>
  );
};

export default ExpenseChart;
