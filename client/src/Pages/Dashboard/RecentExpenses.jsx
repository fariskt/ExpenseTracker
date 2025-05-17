import { Link } from "react-router-dom";
import PulseLoader from "../../Components/ui/PulseLoader";
import { useExpenses } from "../../hooks/useExpenses";
import { TbExternalLink } from "react-icons/tb";
import useUIStore from "../../store/useUIForm";

const RecentExpenses = () => {
  const { data: expenses, isLoading } = useExpenses();
  const { setShowForm } = useUIStore();

  return (
    <>
      <div className="container border border-gray-400 rounded-lg w-[95%] md:w-[95%] min-h-[210px] max-h-[230px] overflow-y-auto scroll-bar">
        <div className="flex justify-between">
          <h1 className="my-3 pl-4 ">Recent Expenses</h1>
          <button
            className="text-blue-500 text-2xl mr-4 md:static absolute right-4"
            onClick={() => setShowForm("budget")}
          >
            +
          </button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center mt-16">
            <PulseLoader />
          </div>
        ) : expenses?.length > 0 ? (
          <table className="w-full table-auto">
            <thead className="sticky top-0">
              <tr className=" text-left  text-sm uppercase tracking-wider bg-gray-100">
                <th className="px-4 py-4 text-left font-medium">Subject</th>
                <th className="px-4 py-4 text-left font-normal">Type</th>
                <th className="px-4 py-4 text-left font-normal">Date</th>
                <th className="px-4 py-4 text-left font-normal">Amount</th>
              </tr>
            </thead>
            {expenses?.length > 0 &&
              expenses?.map((item, index) => (

                <tbody className="font-light " key={index}>
                  <tr
                    key={index}
                    className="border-b border-gray-200 transition-colors"
                    >
                    <td className="p-4  capitalize">
                      {item.subject}
                    </td>
                    <td className="p-4 ">
                      {item.category}
                    </td>
                    <td className="p-4 uppercase">
                      {" "}
                      {item.date &&
                        new Date(item.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-4 font-medium">₹{item.amount}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        ) : (
          <p className="text-gray-400 text-sm ml-4">
            No expenses found, Add expense to show here
          </p>
        )}
      </div>
    </>
  );
};

export default RecentExpenses;
