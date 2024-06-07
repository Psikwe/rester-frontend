import React from "react";
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
import CreateEmployee from "./create_employee/_page";
import EmployeeDashboardLayout from "./employee_dashboard/_page";
import CreateCompany from "./create_company/_page";
import UpdateEmployee from "./update_employee/_page";
import { getUserSession } from "../core/utilities";

export default function AppRoutes() {
  const [userSession] = React.useState(getUserSession());
  return (
    <BrowserRouter>
      <ToastContainer progressClassName="toast-progress" />
      <Routes>
        {!userSession ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        ) : (
          <>
            <Route path="dashboard/" element={<DashboardLayout />}>
              <Route path="create-company" element={<CreateCompany />} />
              <Route path="create-employee" element={<CreateEmployee />} />
              <Route path="manage-company" element={<ManageCompany />} />
              <Route path="manage-employees" element={<ManageEmployees />} />
              <Route path="view-company" element={<ViewCompany />} />
            </Route>

            <Route path="/employee" element={<EmployeeDashboardLayout />}>
              <Route path="update-employee" element={<UpdateEmployee />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
