import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBoard from "../pages/Dashboard";
import { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import TasksDone from "../pages/TasksDone";

const AllRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@Tasks:token");

    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home authenticated={authenticated} />} />
      <Route
        path="/login"
        element={
          <Login
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        }
      />
      <Route
        path="/register"
        element={<Register authenticated={authenticated} />}
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        }
      />
      <Route
        path="/tasksDone"
        element={
          <TasksDone
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        }
      />
    </Routes>
  );
};
export default AllRoutes;
