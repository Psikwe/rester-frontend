import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Signup from "./signup";
import Login from "./login";
import DashboardLayout from "./dashboard_layout/_page";
import ManageCompany from "./manage_company/_page";
import ManageEmployees from "./manage_employees/_page";
import ViewCompany from "./view_company/_page";
import Layout from "@/components/Layout";
import "tw-elements";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ToastContainer progressClassName="toast-progress" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/" element={<DashboardLayout />}>
          <Route path="manage-company" element={<ManageCompany />} />
          <Route path="manage-employees" element={<ManageEmployees />} />
          <Route path="view-company" element={<ViewCompany />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
