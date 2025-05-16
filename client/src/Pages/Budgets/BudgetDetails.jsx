import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import useUIStore from "../../store/useUIForm";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AxiosInstance from "../../Api/AxiosInstance";
import BudgetFormModal from "../Dashboard/Forms/BudgetForm";
import { useBudgets } from "../../hooks/useExpenses";

const BudgetDetails = () => {
  const { showForm, setShowForm } = useUIStore();
  const { data: budgets, refetch } = useBudgets();
  const [BudgetToEdit, setBudgetToEdit] = useState(null);
  const [deletingBudgetId, setDeletingBudgetId] = useState(null);

  const BudgetDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const { mutate: deleleteBudgetMutaion, isPending } = useMutation({
    mutationFn: async (id) => {
      await AxiosInstance.delete(`/budgets/delete/${id}`);
    },
    onSuccess: () => {
      refetch();
      toast.success("Budget deleted Successfully");
    },
    onError: () => {
      toast.error("Error deleting Budget");
    },
  });

  const deleteBudget = (BudgetID) => {
    setDeletingBudgetId(BudgetID);
    deleleteBudgetMutaion(BudgetID);
  };

  const editBudget = (Budget) => {
    setShowForm("BudgetForm");
    setBudgetToEdit(Budget);
  };

  return (
    <div className=" w-full mx-auto border border-gray-700 rounded-lg bg-[#0f172a] min-h-[200px] md:max-h-[230px]">
        <div className="flex flex-col  gap-8 pt-24 md:pt-16 md:pl-72 mx-auto md:px-10 px-2 bg-[#040913] max-w-[100vw] min-h-screen">
        <div className="flex justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white w-full">
            Budgets
          </h1>
          <button
            onClick={() => {
              if (BudgetToEdit) {
                setBudgetToEdit(null);
              }
              setShowForm("BudgetForm");
            }}
            className="w-40 bg-green-700 text-sm font-bold md:text-base text-white rounded-md hover:bg-green-600 transition"
          >
            + New Budget
          </button>
        </div>
        {showForm === "BudgetForm" && (
          <BudgetFormModal
            setShowForm={setShowForm}
            BudgetToEdit={BudgetToEdit}
            setBudgetToEdit={setBudgetToEdit}
          />
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400 bg-gray-900 border-separate border-spacing-0">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-4 text-left border-b border-gray-700">
                  Budget
                </th>
                <th className="p-4 text-left border-b border-gray-700">
                  Limit
                </th>
                <th className="p-4 text-left border-b border-gray-700">
                  Period
                </th>
                <th className="p-4 text-left border-b border-gray-700">
                  Start Date
                </th>
                <th className="p-4 text-left border-b border-gray-700">
                  End Date
                </th>
                <th className="p-4 text-left border-b border-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {budgets?.length > 0 ? (
                budgets.map((item, index) => (
                  <tr
                    key={index}
                    className=" transition-colors border-b  border-gray-700"
                  >
                    <td className="p-4 font-semibold text-gray-300 capitalize">
                      {item.category}
                    </td>
                    <td className="p-4 font-semibold text-white capitalize">
                      ₹{item.limit}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {item.period}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {BudgetDate(item.startDate)}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {BudgetDate(item.endDate)}
                    </td>
                    <td className="flex items-center gap-4 p-4  text-blue-400 cursor-pointer hover:underline">
                      <span
                        onClick={() => editBudget(item)}
                        className="text-lg px-3 py-1 bg-blue-800 hover:bg-blue-600 opacity-90 rounded-md text-white"
                      >
                        <TbEdit />
                      </span>
                      <span
                        onClick={() => deleteBudget(item.id)}
                        className={`text-lg px-3 py-1 ${
                          isPending && item.id === deletingBudgetId
                            ? "bg-red-800 animate-pulse"
                            : "bg-red-600"
                        } hover:bg-red-500 opacity-90 rounded-md text-white`}
                      >
                        <MdDeleteOutline />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No Budgets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetDetails;
