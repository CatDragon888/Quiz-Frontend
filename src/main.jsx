import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBook from "./components/CreateBook";
import UpdateBook from "./components/UpdateBook";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreateBook />} />
      <Route path="/update/:id" element={<UpdateBook />} />
    </Routes>
  </BrowserRouter>
);
