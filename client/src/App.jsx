import "./App.css";
import Layout from "./Components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { Toaster } from "react-hot-toast";
import DashBoard from "./Components/DashBoard";
import ExpenseDetails from "./Pages/Expenses/ExpenseDetails";
import TripDetails from "./Pages/Trips/TripDetails";
import AnalyticPage from "./Pages/Analytics/AnalyticPage";

function App() {
  return (
    <BrowserRouter>
          <Toaster/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route element={<Layout />}>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/expenses" element={<ExpenseDetails/>}/>
          <Route path="/trips" element={<TripDetails/>}/>
          <Route path="/analytics" element={<AnalyticPage/>}/>
          
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
