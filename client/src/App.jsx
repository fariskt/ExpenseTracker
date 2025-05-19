import "./App.css";
import Layout from "./Components/Layout";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { Toaster } from "react-hot-toast";
import DashBoard from "./Components/DashBoard";
import ExpenseDetails from "./Pages/Expenses/ExpenseDetails";
import AnalyticPage from "./Pages/Analytics/AnalyticPage";
import GoalDetails from "./Pages/Goals/GoalDetails";
import BudgetDetails from "./Pages/Budgets/BudgetDetails";

function App() {
  return (
    <HashRouter>
          <Toaster/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route element={<Layout />}>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/expenses" element={<ExpenseDetails/>}/>
          <Route path="/goals" element={<GoalDetails/>}/>
          <Route path="/budget" element={<BudgetDetails/>}/>
          <Route path="/analytics" element={<AnalyticPage/>}/>
          
          </Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
