import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpense = localStorage.getItem("expenses");
    return savedExpense ? JSON.parse(savedExpense) : [];
  });

  const [tripDetails, setTripDetails] = useState(()=> {
    const savedTrip = localStorage.getItem("tripDetails");
    return savedTrip ? JSON.parse(savedTrip) : []
  })
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);


  const values = {
    expenses,
    setExpenses,
    tripDetails,
    setTripDetails
  };
  return (
    <AppContext.Provider value={{ ...values }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
