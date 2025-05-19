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
import AddButton from "../../Components/ui/AddButton";
import { searchHook } from "../../hooks/useSearch";
import ProgressLoader from "../../Components/ui/ProgressLoader";
import { useDeleteSelectedId } from "../../hooks/useSelectIdDelete";

const BudgetDetails = () => {
  const { showForm, setShowForm } = useUIStore();
  const { data: budgets, refetch, isLoading } = useBudgets();
  const [BudgetToEdit, setBudgetToEdit] = useState(null);
  const [deletingBudgetId, setDeletingBudgetId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const {mutate:deleteSelectedBudgetMutation, isPending: selectedBugetPending } = useDeleteSelectedId("budgets")

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

const handleSelectedExpenseDelete= ()=> {
  deleteSelectedBudgetMutation(selectedBudgets, {
    onSuccess: ()=> {
      refetch()
    }
  })
}

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <ProgressLoader />
      </div>
    );
  }

  return (
    <div className=" w-full mx-auto  rounded-lg min-h-[200px] md:max-h-[230px]">
      <div className="flex flex-col  gap-8 pt-10 md:pt-16 md:pl-28 mx-auto md:px-10 px-2  max-w-[100vw] min-h-screen">
        <div className="flex justify-between">
          <div className="flex flex-col text-sm md:mx-0 mx-2">
            <h1 className="text-2xl md:text-3xl font-bold  w-full">Budgets</h1>
            <p className="text-gray-500">showing budgets {filteredBudgets?.length} of {budgets?.length}</p>
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
        <div className="rounded-xl shadow border bg-white">
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
              name="filter"
              value={selectedFilter}
              onChange={(e)=> setSelectedFilter(e.target.value)}
              className="border border-gray-400 p-1 rounded-md outline-gray-500"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          </div>
          <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">
            <thead className="bg-blue-50 text-gray-600">
              <tr>
               {filteredBudgets.length > 0 && <th className="px-6 py-4 border-y border-gray-100">
                  <input
                    id="selectAll"
                    type="checkbox"
                    checked={selectedBudgets.length === allIds.length}
                    onChange={handleSelectAll}
                    className="accent-blue-500"
                  />
                </th>}
                <th className="px-6 py-4 border-y border-gray-100">Budget</th>
                <th className="px-6 py-4 border-y border-gray-100">Limit</th>
                <th className="px-6 py-4 border-y border-gray-100">Period</th>
                <th className="px-6 py-4 border-y border-gray-100">Start Date</th>
                <th className="px-6 py-4 border-y border-gray-100">End Date</th>
                <th className="px-6 py-4 border-y border-gray-100">Actions</th>
                {selectedBudgets.length > 0 && (
                  <th className={`absolute right-16 mt-3 ${selectedBugetPending ? "animate-pulse" : ""} `} onClick={handleSelectedExpenseDelete}>
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
    </div>
  );
};

export default BudgetDetails;
