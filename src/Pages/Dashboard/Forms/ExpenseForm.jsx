import React, { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";

const ExpenseFormModal = ({ setShowForm }) => {
  const { setExpenses } = useContext(AppContext);
  const [formData, setFormData] = useState({
    id: Date.now(),
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
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[today.getDay()];

    const expenseForm = { ...formData, day };

    setExpenses((prev) => [...prev, expenseForm]);
    setFormData({
      id:Date.now(),
      subject: "",
      category: "",
      amount: "",
      description: "",
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="md:w-full w-[90%] max-w-lg p-4 md:p-8 bg-gray-800 rounded-lg shadow-lg relative">
        <button
          onClick={() => setShowForm("")}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          New Expense
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={handleChange}
              name="subject"
              id="subject"
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              name="category"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
              <option value="hospital">Hospital</option>
              <option value="fuel">Fuel</option>
              <option value="other">others</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              name="description"
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowForm("")}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;
