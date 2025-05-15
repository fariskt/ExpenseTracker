import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AxiosInstance from "../../../Api/AxiosInstance";
import {  useGoals } from "../../../hooks/useExpenses";
import { LuGoal } from "react-icons/lu";

const GoalFormModal = ({ setShowForm }) => {
  const { refetch:refechGoals } = useGoals();

  const [formData, setFormData] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: name === "target" || name === "saved" ? Number(value) : value,
    });
  };

  const { mutate: postGoalFormMutation, isPending } = useMutation({
    mutationFn: async (goalForm) => {
      await AxiosInstance.post("/goals/create", goalForm);
    },
    onSuccess: () => {
      refechGoals()
      toast.success("Goal Created Succesfully");
      setShowForm(false);
    },
    onError: (err) => {
      toast.error("Error adding Goal");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    postGoalFormMutation(formData);
    setFormData({
      name: "",
      target: 1,
      saved: 1,
      deadline: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className="md:w-full w-[90%] max-w-lg p-4 md:p-8 rounded-xl shadow-2xl relative border border-blue-500/20"
        style={{
          background: "rgba(17, 24, 39, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={() => setShowForm("")}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
        >
          ✖
        </button>
        <div className="flex justify-center items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-center text-white">
            Set Goal
          </h2>
          <span className="text-2xl text-green-500">
            {" "}
            <LuGoal />
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Goal
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              name="name"
              id="name"
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter Goal"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="target"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Target
            </label>
            <input
              type="number"
              id="target"
              name="target"
              required
              min={0}
              value={formData.target}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter target"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Saved
            </label>
            <input
              id="saved"
              type="number"
              value={formData.saved}
              name="saved"
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter saved amount"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Set Deadline
            </label>
            <input
              id="deadline"
              type="date"
              value={formData.deadline}
              name="deadline"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter deadline"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowForm("")}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-md ${
                isPending
                  ? "bg-blue-900 animate-pulse text-white"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalFormModal;
