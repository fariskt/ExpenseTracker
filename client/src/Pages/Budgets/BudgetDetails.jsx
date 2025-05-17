import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline, MdSearch } from "react-icons/md";
import useUIStore from "../../store/useUIForm";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AxiosInstance from "../../Api/AxiosInstance";
import BudgetFormModal from "../Dashboard/Forms/BudgetForm";
import { useBudgets } from "../../hooks/useExpenses";
import DeleteButton from "../../Components/ui/DeleteButton";
import Loader from "../../Components/ui/Loading";
import AddButton from "../../Components/ui/AddButton";
import { searchHook } from "../../hooks/useSearch";

const BudgetDetails = () => {
  const { showForm, setShowForm } = useUIStore();
  const { data: budgets, refetch, isLoading } = useBudgets();
  const [BudgetToEdit, setBudgetToEdit] = useState(null);
  const [deletingBudgetId, setDeletingBudgetId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

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

  const [selectedBudgets, setSelectedBudgets] = useState([]);

  const allIds = (budgets && budgets.map((item) => item.id)) || [];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBudgets(allIds);
    } else {
      setSelectedBudgets([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedBudgets((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const createGoalFormOpen = () => {
    if (BudgetToEdit) {
      setBudgetToEdit(null);
    }
    setShowForm("BudgetForm");
  };

const filteredBudgets = searchHook(budgets, searchInput, selectedFilter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" w-full mx-auto  rounded-lg min-h-[200px] md:max-h-[230px]">
      <div className="flex flex-col  gap-8 pt-24 md:pt-16 md:pl-28 mx-auto md:px-10 px-2  max-w-[100vw] min-h-screen">
        <div className="flex justify-between">
          <div className="flex flex-col text-sm ">
            <h1 className="text-2xl md:text-3xl font-bold  w-full">Budgets</h1>
            <p className="text-gray-500">showing budgets 10 of 29{}</p>
          </div>
          <AddButton onClick={createGoalFormOpen} />
        </div>
        {showForm === "BudgetForm" && (
          <BudgetFormModal
            setShowForm={setShowForm}
            BudgetToEdit={BudgetToEdit}
            setBudgetToEdit={setBudgetToEdit}
          />
        )}
        <div className="overflow-x-auto rounded-xl shadow border bg-white">
          <div className="flex justify-between mx-4 py-4">
            <div>
              <span className="absolute text-xl text-gray-400 mt-2 ml-1">
                <MdSearch />
              </span>
              <input
                type="text"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="search goals"
                className="border pl-7 outline-gray-300 p-1 rounded-md"
              />
            </div>
            <div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border outline-none p-1 rounded-md"
              >
                <option value="">All Categories</option>
                <option value="hospital">Hospital</option>
                <option value="food">Food</option>
                <option value="fuel">Fuel</option>
              </select>
            </div>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4">
                  <input
                    id="selectAll"
                    type="checkbox"
                    checked={selectedBudgets.length === allIds.length}
                    onChange={handleSelectAll}
                    className="accent-blue-500"
                  />
                </th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Limit</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4">Actions</th>
                {selectedBudgets.length > 0 && (
                  <th className="absolute right-16 mt-3">
                    <DeleteButton />
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-100">
              {filteredBudgets?.length > 0 ? (
                filteredBudgets.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedBudgets.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                        className="accent-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium capitalize text-gray-800">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      ₹{item.limit}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.period}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {BudgetDate(item.startDate)}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {BudgetDate(item.endDate)}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button
                        onClick={() => editBudget(item)}
                        className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-md text-lg transition"
                      >
                        <TbEdit />
                      </button>
                      <button
                        onClick={() => deleteBudget(item.id)}
                        className={`text-red-600 hover:bg-red-100 px-3 py-1 rounded-md text-lg transition ${
                          isPending && item.id === deletingBudgetId
                            ? "animate-pulse"
                            : ""
                        }`}
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
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
