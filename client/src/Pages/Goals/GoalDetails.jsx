import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline, MdSearch } from "react-icons/md";
import useUIStore from "../../store/useUIForm";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AxiosInstance from "../../Api/AxiosInstance";
import GoalFormModal from "../Dashboard/Forms/GoalForm";
import { useGoals } from "../../hooks/useExpenses";
import Loader from "../../Components/ui/Loading";
import DeleteButton from "../../Components/ui/DeleteButton";
import AddButton from "../../Components/ui/AddButton";
import { searchHook } from "../../hooks/useSearch";
import ProgressLoader from "../../Components/ui/ProgressLoader";
import { useDeleteSelectedId } from "../../hooks/useSelectIdDelete";

const GoalDetails = () => {
  const { showForm, setShowForm } = useUIStore();
  const { data: goals, refetch, isLoading } = useGoals();
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [deletingGoalId, setDeletingGoalId] = useState(null);
  const [selectRows, setSelectedRows] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [searchInput, setSearchInput] = useState("");
  const {mutate:deleteSelectedGoalMuation, isPending:selectedGoalPending } = useDeleteSelectedId("goals")

  const goalDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const { mutate: deleleteGoalMutaion, isPending } = useMutation({
    mutationFn: async (id) => {
      await AxiosInstance.delete(`/goals/delete/${id}`);
    },
    onSuccess: () => {
      refetch();
      toast.success("Goal deleted Successfully");
    },
    onError: () => {
      toast.error("Error deleting Goal");
    },
  });

  const deleteGoal = (goalID) => {
    setDeletingGoalId(goalID);
    deleleteGoalMutaion(goalID);
  };

  const editGoal = (goal) => {
    setShowForm("goalForm");
    setGoalToEdit(goal);
  };
const filteredGoals = searchHook(goals, searchInput, selectedFilter);

  const allIds = (filteredGoals && filteredGoals.map((item) => item.id)) || [];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const createGoal = () => {
    if (goalToEdit) {
      setGoalToEdit(null);
    }
    setShowForm("goalForm");
  };

  const handleSelectedGoalsToDelete= ()=> {
  deleteSelectedGoalMuation(selectRows, {
    onSuccess: ()=> {
      refetch()
    }
  })
}

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ProgressLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col  gap-8 pt-10 md:pt-16 md:pl-28 mx-auto md:px-10 px-2 max-w-[vw] ">
      <div className="flex justify-between">
        <div className="flex flex-col text-sm md:mx-0 mx-2">

        <h1 className="text-2xl md:text-3xl font-bold w-full">Goals</h1>
        <p className="text-gray-500">showing goals {filteredGoals.length} of {goals.length}</p>
        </div>
        <AddButton onClick={createGoal} />
      </div>
      {showForm === "goalForm" && (
        <GoalFormModal
          setShowForm={setShowForm}
          goalToEdit={goalToEdit}
          setGoalToEdit={setGoalToEdit}
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
              onChange={(e)=> setSearchInput(e.target.value)}
              value={searchInput}
              name="search"
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
              {filteredGoals.length > 0 && <th className="px-6 py-4 border-y border-y-gray-100">
                <input
                  type="checkbox"
                  checked={selectRows.length === allIds.length}
                  onChange={handleSelectAll}
                  className="accent-blue-500"
                />
              </th>}
              <th className="px-6 py-4 border-y border-gray-100">Goal</th>
              <th className="px-6 py-4 border-y border-gray-100">Target</th>
              <th className="px-6 py-4 border-y border-gray-100">Saved</th>
              <th className="px-6 py-4 border-y border-gray-100">Deadline</th>
              <th className="px-6 py-4 border-y border-gray-100">Actions</th>
              {selectRows.length > 0 && (
                <th className={`absolute right-16 mt-3 ${selectedGoalPending ? "animate-pulse" : ""}`} onClick={handleSelectedGoalsToDelete}>
                  <DeleteButton />
                </th>
              )}
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y divide-gray-100">
            {filteredGoals?.length > 0 ? (
              filteredGoals.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectRows.includes(item.id)}
                      onChange={() => handleRowSelect(item.id)}
                      className="accent-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3 font-medium capitalize">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    ₹{item.target}
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{item.saved}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {goalDate(item.deadline)}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button
                      onClick={() => editGoal(item)}
                      className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-md text-lg transition"
                    >
                      <TbEdit />
                    </button>
                    <button
                      onClick={() => deleteGoal(item.id)}
                      className={`text-red-600 hover:bg-red-100 px-3 py-1 rounded-md text-lg transition ${
                        isPending && item.id === deletingGoalId
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
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No Goals found.
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

export default GoalDetails;
