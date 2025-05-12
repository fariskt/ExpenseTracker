import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpense = localStorage.getItem("expenses");
    return savedExpense ? JSON.parse(savedExpense) : [];
  });

  const [tripDetails, setTripDetails] = useState(() => {
    const savedTrip = localStorage.getItem("tripDetails");
    return savedTrip ? JSON.parse(savedTrip) : [];
  });

  const [userName, setUserName] = useState("");
  const [showForm, setShowForm] = useState("");


  useEffect(() => {
    
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      const enteredName = prompt("Please enter your name:");
      if (enteredName) {
        localStorage.setItem("userName", enteredName);
        setUserName(enteredName);
      }
    } else {
      setUserName(storedName);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("tripDetails", JSON.stringify(tripDetails));
  }, [tripDetails]);

  const values = {
    expenses,
    setExpenses,
    tripDetails,
    setTripDetails,
    setUserName,
    userName,
    setShowForm,
    showForm
  };
  return (
    <AppContext.Provider value={{ ...values }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
