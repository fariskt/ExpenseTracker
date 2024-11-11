import "./App.css";
import DashBoard from "./Components/DashBoard";
import Layout from "./Components/Layout";
import SideBar from "./Components/Sidebar/SideBar";
import { AppProvider } from "./context/AppContext";
import ExpenseDetails from "./Pages/Expenses/ExpenseDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
