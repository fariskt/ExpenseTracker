import { useExpenses } from "../../hooks/useExpenses";

const RecentExpenses = () => {
  const { data: expenses } = useExpenses();
  
  return (
    <div className="container border border-gray-700 rounded-lg w-[95%] md:w-[95%] bg-[#0f172a] min-h-[200px] max-h-[230px] overflow-y-auto scroll-bar">
      <h1 className="text-base mb-4 border-b rounded-lg border-gray-700 p-2 h-10  md:w-full bg-[#0f172a]">
        Recent Expenses
      </h1>
      <table className="w-full table-auto mt-5">
        <thead>
          <tr>
            <th className="px-4 text-left font-medium">Subject</th>
            <th className="px-4 text-left font-normal">Type</th>
            <th className="px-4 text-left font-normal">Date</th>
            <th className="px-4 text-left font-normal">Amount</th>
          </tr>
        </thead>
        {expenses?.length > 0 && expenses?.map((item, index) => (
          <tbody className="font-light" key={index}>
            <tr className="mt-44">
              <td className="py-1 px-3 md:px-4">{item.subject}</td>
              <td className="py-1 px-3 md:px-4">{item.category}</td>
              <td className="py-1 px-3 md:px-4">{item.date && new Date(item.date).toLocaleDateString("en-GB")}</td>
              <td className="py-1 px-3 md:px-4 font-bold">₹{item.amount}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default RecentExpenses;
