import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
export default AllRoutes;
