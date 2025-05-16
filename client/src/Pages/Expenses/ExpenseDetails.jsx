import React, { useContext, useState } from "react";
import { GiClothes } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { RiHospitalFill } from "react-icons/ri";
import { BsFillFuelPumpFill, BsFillPatchQuestionFill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline, MdOutlineOtherHouses } from "react-icons/md";
import ExpenseFormModal from "../Dashboard/Forms/ExpenseForm";
import useUIStore from "../../store/useUIForm";
import { useExpenses } from "../../hooks/useExpenses";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AxiosInstance from "../../Api/AxiosInstance";

const ExpenseDetails = () => {
  const { showForm, setShowForm } = useUIStore();
  const { data: expenses, refetch } = useExpenses();
  const [expenseToEdit, setExpenseToEdit] = useState(null)

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
        return <BsFillPatchQuestionFill  className="text-orange-600"/>;
    }
  };

  const expenseDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const { mutate: deleleteExpenseMutaion, isPending } = useMutation({
    mutationFn: async (id) => {
      await AxiosInstance.delete(`/expenses/delete/${id}`,);
    },
    onSuccess: () => {
      refetch();
      toast.success("Expense deleted Successfully");
    },
    onError: () => {
      toast.error("Error deleting Expense");
    },
  });

  const deleteExpense = (expenseID) => {
    deleleteExpenseMutaion(expenseID);
  };

  const editExpense = (expense)=> {
    setShowForm("expenseForm")
    setExpenseToEdit(expense)
  }

  return (
    <div className="flex flex-col gap-8 pt-24 md:pt-16 md:pl-72 mx-auto md:px-10 px-2 bg-[#040913] max-w-[100vw] min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white w-full">
          Expenses
        </h1>
        <button
          onClick={() => {
            if(expenseToEdit){
              setExpenseToEdit(null)
            }
            setShowForm("expenseForm")
          }}
          className="w-40 bg-green-700 text-sm font-bold md:text-base text-white rounded-md hover:bg-green-600 transition"
        >
          + New Expense
        </button>
      </div>
      {showForm === "expenseForm" && (
        <ExpenseFormModal setShowForm={setShowForm} expenseToEdit={expenseToEdit} setExpenseToEdit={setExpenseToEdit}/>
      )}
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
            {expenses?.length > 0 ? (
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
                    ₹{item.amount}
                  </td>
                  <td className="flex items-center gap-4 text-blue-400 cursor-pointer hover:underline">
                    <span 
                      onClick={() => editExpense(item)}
                    className="text-lg px-3 py-1 bg-blue-800 hover:bg-blue-600 opacity-90 rounded-md text-white">
                      <TbEdit />
                    </span>
                    <span
                      onClick={() => deleteExpense(item.id)}
                      className={`text-lg px-3 py-1 ${isPending ? "bg-red-800 animate-pulse" : "bg-red-600"} hover:bg-red-500 opacity-90 rounded-md text-white`}
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
