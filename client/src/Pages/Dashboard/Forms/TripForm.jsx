import React, { useContext, useState } from "react";
import useTripStore from "../../../store/useTripStore";

const TripFormModal = ({ setShowForm }) => {
  const { setTripDetails } = useTripStore();
  const [formData, setFormData] = useState({
    destination: "",
    date: "",
    category: "",
    budget: "",
    description: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name] : value
    })
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    setTripDetails((prev) => [...prev, formData]);
    setFormData({
      destination: "",
      date: "",
      category: "",
      budget: "",
      description: "",
    });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="md:w-full w-[90%] max-w-3xl p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg relative">
        <button
          onClick={() => setShowForm("")}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-white">
          New Trip
        </h2>

        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <label
              htmlFor="destination"
              className="block text-sm font-medium mb-2"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              required
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Trip Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              name="date"
              id="date"
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Trip Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="business">Business</option>
              <option value="leisure">Leisure</option>
              <option value="adventure">Adventure</option>
              <option value="family">Family</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="budget" className="block text-sm font-medium mb-2">
              Budget
            </label>
            <input
              type="number"
              name="budget"
              required
              onChange={handleChange}
              value={formData.budget}
              id="budget"
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter budget"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              name="description"
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter trip description"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => setShowForm("")}
              className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripFormModal;
