import "./App.css";
import Layout from "./Components/Layout";
import { AppProvider } from "./context/AppContext";
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
