import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { IoMdAirplane } from "react-icons/io";

const TripDetails = () => {
  const { tripDetails } = useContext(AppContext);
  return (
    <div className="flex flex-col gap-8 pt-16 pl-72 mx-auto px-10 bg-[#040913] min-h-screen">
      <div className="flex ">
        <h1 className="text-3xl font-bold text-white w-full">Trip Details</h1>
        <button className="w-40 bg-green-700 text-white rounded-md hover:bg-green-600 transition">
          + New Trip
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-900 border-separate border-spacing-0">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-4 text-left border-b border-gray-700">
                DETAILS
              </th>
              <th className="p-4 text-left border-b border-gray-700">
                CATEGORY
              </th>
              <th className="p-4 text-left border-b border-gray-700">AMOUNT</th>
              <th className="p-4 text-left border-b border-gray-700">DATE</th>
              <th className="p-4 text-left border-b border-gray-700">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {tripDetails.length > 0 ? (
              tripDetails.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 transition-colors border-b  border-gray-700"
                >
                  <td className="flex items-center gap-4 p-4 text-white">
                    <span className="p-2 text-lg bg-slate-700 opacity-80 rounded-full">
                      <IoMdAirplane/>
                    </span>
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-400 font-bold">
                        {item.date}
                      </p>
                      <p className="text-base font-semibold">
                        {item.destination}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-gray-300 capitalize">
                    {item.category}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    {item.budget}
                  </td>
                  <td className="p-4 font-semibold text-white">{item.date}</td>
                  <td className="p-4 font-semibold text-white">pending</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No tripDetails found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripDetails;
