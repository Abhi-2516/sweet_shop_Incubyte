import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const token = localStorage.getItem("token");

  if (!token) {
    return page === "login" ? (
      <Login switchPage={setPage} />
    ) : (
      <Register switchPage={setPage} />
    );
  }

  return <Dashboard />;
}

export default App;
