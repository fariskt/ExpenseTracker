import "./App.css";
import Layout from "./Components/Layout";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
