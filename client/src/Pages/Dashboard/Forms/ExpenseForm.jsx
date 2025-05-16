import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AxiosInstance from "../../../Api/AxiosInstance";
import { useExpenses } from "../../../hooks/useExpenses";

const ExpenseFormModal = ({ setShowForm, expenseToEdit, setExpenseToEdit }) => {
  const { refetch } = useExpenses();

  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const { mutate: postExpenseMutation, isPending } = useMutation({
    mutationFn: async (expenseForm) => {
      await AxiosInstance.post("/expenses/create", expenseForm);
    },
    onSuccess: () => {
      toast.success("Expense Added Succesfully");
      refetch();
      setShowForm(false);
    },
    onError: (err) => {
      toast.error("Error adding expense");
    },
  });
  const { mutate: editExpenseMutation, isPending: editExpenseisPending } =
    useMutation({
      mutationFn: async (expenseForm) => {
        await AxiosInstance.put(
          `/expenses/update/${expenseToEdit.id}`,
          expenseForm
        );
      },
      onSuccess: () => {
        toast.success("Expense updated Succesfully");
        refetch();
        setShowForm(false);
        setExpenseToEdit(null);
        setFormData({
          subject: "",
          category: "",
          amount: "",
          description: "",
          date: new Date().toISOString(),
        });
      },
      onError: (err) => {
        toast.error("Error updating expense");
        setExpenseToEdit(null);
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[today.getDay()];
    const expenseForm = { ...formData, day };
    if (expenseToEdit) {
      editExpenseMutation(expenseForm);
    } else {
      postExpenseMutation(expenseForm);
    }
  };

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        subject: expenseToEdit.subject || "",
        category: expenseToEdit.category || "",
        amount: expenseToEdit.amount || "",
        description: expenseToEdit.description || "",
        date: expenseToEdit.date || new Date().toISOString(),
      });
    }
  }, [expenseToEdit]);

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
          onClick={() => {
            setShowForm("");
            setExpenseToEdit(null);
          }}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {expenseToEdit ? "Edit Expense" : "New Expense"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              name="subject"
              id="subject"
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter subject"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              required
              name="category"
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
              <option value="hospital">Hospital</option>
              <option value="fuel">Fuel</option>
              <option value="other">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              name="description"
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-gray-900 bg-opacity-60 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter description"
            ></textarea>
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
              {isPending
                ? "Submitting..."
                : editExpenseisPending
                ? "Editing..."
                : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;
