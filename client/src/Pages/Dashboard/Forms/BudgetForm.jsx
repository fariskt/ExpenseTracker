import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AxiosInstance from "../../../Api/AxiosInstance";
import { useExpenses } from "../../../hooks/useExpenses";
import { IoBagHandleOutline } from "react-icons/io5";

const BudgetFormModal = ({ setShowForm }) => {
  const { refetch } = useExpenses();

  const today = new Date().toISOString().split("T")[0]; // "2025-05-14"

  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    period: "",
    startDate: today,
    endDate: today,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: name === "limit" ? Number(value) : value,
    });
  };

  const { mutate: postBudgetMuation, isPending } = useMutation({
    mutationFn: async (budgetForm) => {
      await AxiosInstance.post("/budget/create", budgetForm);
    },
    onSuccess: () => {
      toast.success("Budget Added Succesfully");
      refetch();
      setShowForm(false);
    },
    onError: (err) => {
      toast.success("Error adding budget");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[today.getDay()];
    const budgetForm = { ...formData, day };

    postBudgetMuation(budgetForm);
    setFormData({
      category: "",
      limit: "",
      period: "",
      startDate: today,
      endDate: today,
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
            Set Budget
          </h2>
          <span className="text-2xl text-orange-500">
            <IoBagHandleOutline />
          </span>{" "}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={handleChange}
              required
              name="category"
              id="category"
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter category"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="limit"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Limit
            </label>
            <input
              type="number"
              id="limit"
              name="limit"
              required
              step={0.01}
              min={0}
              value={formData.limit}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter limit"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Period
            </label>
            <select
              id="period"
              value={formData.period}
              required
              name="period"
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Period</option>
              <option value="MONTHLY">MONTHLY</option>
              <option value="WEEKLY">WEEKLY</option>
              <option value="CUSTOM">CUSTOM</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Set StartDate
            </label>
            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              name="startDate"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter startDate"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Set EndDate
            </label>
            <input
              id="endDate"
              type="date"
              value={formData.endDate}
              name="endDate"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter endDate"
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

export default BudgetFormModal;
