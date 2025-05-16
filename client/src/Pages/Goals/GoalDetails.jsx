import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import useUIStore from "../../store/useUIForm";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AxiosInstance from "../../Api/AxiosInstance";
import GoalFormModal from "../Dashboard/Forms/GoalForm";
import { useGoals } from "../../hooks/useExpenses";

const GoalDetails = () => {
  const { showForm, setShowForm } = useUIStore();
  const { data: goals, refetch } = useGoals();
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [deletingGoalId, setDeletingGoalId] = useState(null);


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
    setDeletingGoalId(goalID)
    deleleteGoalMutaion(goalID);
  };

  const editGoal = (goal) => {
    setShowForm("goalForm");
    setGoalToEdit(goal);
  };

  return (
    <div className="flex flex-col  gap-8 pt-24 md:pt-16 md:pl-72 mx-auto md:px-10 px-2 bg-[#040913] max-w-[vw] min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white w-full">
          Goals
        </h1>
        <button
          onClick={() => {
            if (goalToEdit) {
              setGoalToEdit(null);
            }
            setShowForm("goalForm");
          }}
          className="w-40 bg-green-700 text-sm font-bold md:text-base text-white rounded-md hover:bg-green-600 transition"
        >
          + New Goal
        </button>
      </div>
      {showForm === "goalForm" && (
        <GoalFormModal
          setShowForm={setShowForm}
          goalToEdit={goalToEdit}
          setGoalToEdit={setGoalToEdit}
        />
      )}
      <div className="overflow-x-auto ">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-900 border-separate border-spacing-0">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-4 text-left border-b border-gray-700">Goal</th>
              <th className="p-4 text-left border-b border-gray-700">Target</th>
              <th className="p-4 text-left border-b border-gray-700">Saved</th>
              <th className="p-4 text-left border-b border-gray-700">
                Deadline
              </th>
              <th className="p-4 text-left border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {goals?.length > 0 ? (
              goals.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 transition-colors border-b  border-gray-700"
                >
                  <td className="p-4 font-semibold text-gray-300 capitalize">
                    {item.name}
                  </td>
                  <td className="p-4 font-semibold text-gray-300 capitalize">
                    ₹{item.target}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    ₹{item.saved}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    {goalDate(item.deadline)}
                  </td>
                  <td className="flex items-center gap-4 p-4 w-fit text-blue-400 cursor-pointer hover:underline">
                    <span
                      onClick={() => editGoal(item)}
                      className="text-lg px-3 py-1  bg-blue-800 hover:bg-blue-600 opacity-90 rounded-md text-white"
                    >
                      <TbEdit />
                    </span>
                    <span
                      onClick={() => deleteGoal(item.id)}
                      className={`text-lg px-3 py-1 ${
                        isPending && item.id === deletingGoalId? "bg-red-800 animate-pulse" : "bg-red-600"
                      } hover:bg-red-500 opacity-90 rounded-md text-white`}
                    >
                      <MdDeleteOutline />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No Goals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoalDetails;
