import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { GiClothes } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { RiHospitalFill } from "react-icons/ri";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

const ExpenseDetails = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "food":
        return <IoFastFood className="text-yellow-400" />;
      case "hospital":
        return <RiHospitalFill className="text-red-500" />;
      case "fuel":
        return <BsFillFuelPumpFill className="text-blue-400" />;
      case "clothing":
        return <GiClothes className="text-green-400" />;
      default:
        return null;
    }
  };

  const expenseDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const deleteExpense = (id) => {
    const filterdExpense = expenses.filter((item) => item.id !== id);
    setExpenses(filterdExpense);
    localStorage.setItem("expenses", JSON.stringify(filterdExpense))
  };

  return (
    <div className="flex flex-col gap-8 pt-16 pl-72 mx-auto px-10 bg-[#040913] min-h-screen">
      <div className="flex ">
        <h1 className="text-3xl font-bold text-white w-full">Expenses</h1>
        <button className="w-40 bg-green-700 text-white rounded-md hover:bg-green-600 transition">
          + New Expense
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-900 border-separate border-spacing-0">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-4 text-left border-b border-gray-700">
                Details
              </th>
              <th className="p-4 text-left border-b border-gray-700">
                Category
              </th>
              <th className="p-4 text-left border-b border-gray-700">Amount</th>
              <th className="p-4 text-left border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 transition-colors border-b  border-gray-700"
                >
                  <td className="flex items-center gap-4 p-4 text-white">
                    <span className="p-2 text-lg bg-slate-700 opacity-80 rounded-full">
                      {getCategoryIcon(item.category)}
                    </span>
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-400 font-bold">
                        {expenseDate(item.date)}
                      </p>
                      <p className="text-base font-semibold">{item.subject}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-gray-300 capitalize">
                    {item.category}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    ${item.amount}
                  </td>
                  <td className="flex items-center gap-4 text-blue-400 cursor-pointer hover:underline">
                    <span className="text-lg px-3 py-1 bg-blue-800 hover:bg-blue-600 opacity-90 rounded-md text-white">
                      <TbEdit />
                    </span>
                    <span
                      onClick={() => deleteExpense(item.id)}
                      className="text-lg px-3 py-1 bg-red-800 hover:bg-red-600 opacity-90 rounded-md text-white"
                    >
                      <MdDeleteOutline />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseDetails;
