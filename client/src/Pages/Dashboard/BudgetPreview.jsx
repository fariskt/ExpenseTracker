import PulseLoader from "../../Components/ui/PulseLoader";
import { useBudgets } from "../../hooks/useExpenses";

const BudgetPreview = () => {
  const { data: budgets ,isLoading} = useBudgets();
  return (
   <div className="w-[95%] md:w-[95%] overflow-x-auto">
      <table className="min-w-[640px] w-full mx-auto border border-gray-700 rounded-lg bg-[#0f172a] min-h-[200px] md:max-h-[230px]">
        <thead>
          <tr className="bg-gray-800 text-left text-gray-300 text-sm uppercase tracking-wider">
            <th className="p-4">Category</th>
            <th className="p-4">Limit</th>
            <th className="p-4">Period</th>
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                <div className="flex justify-center items-center">
                  <PulseLoader />
                </div>
              </td>
            </tr>
          ) : budgets?.length > 0 ? (
            budgets.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="p-4 text-gray-200 font-medium capitalize">
                  {item.category}
                </td>
                <td className="p-4 text-gray-100 font-semibold">
                  ₹{item.limit.toLocaleString()}
                </td>
                <td className="p-4 text-gray-300 uppercase">{item.period}</td>
                <td className="p-4 text-gray-400">
                  {new Date(item.startDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-400">
                  {new Date(item.endDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No budget entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetPreview;
