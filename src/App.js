import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./app/detailsPage";
import Datatable from "./app/data-table";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DetailPage />} />
        <Route path="/showDetails" element={<Datatable />} />
      </Routes>
    </div>
  );
}

export default App;
