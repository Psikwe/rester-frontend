import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Signup from "./signup";
import Login from "./login";
import DashboardLayout from "./dashboard_layout/_page";
import ManageEmployees from "./manage_employees/_page";
import ManageEntity from "./manage_entity/_page";
import ViewCompany from "./view_company/_page";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import CreateEmployee from "./create_employee/_page";
import EmployeeDashboardLayout from "./employee_dashboard/_page";
import UpdateEmployee from "./update_employee/_page";
import { getUserSession } from "../core/utilities";
import CreateEntity from "./create_entity/_page";
import UpdateEntity from "./update_entity/_page";
import { isMobile } from "react-device-detect";
import "@/styles/globals.css";
import "tw-elements";
import "react-toastify/dist/ReactToastify.css";
import MobileScreen from "./mobile_screen/_page";
import RunPayroll from "./run_payroll/_page";
import CreateIncomeType from "./create_income_type/_page";
import CreateAllowableDeductions from "./create_allowable_deductions/_page";
import CreateEmployeeLoan from "./create_employee_loan/_page";

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
            {isMobile ? (
              <Route path="view-entity" element={<MobileScreen />} />
            ) : (
              <>
                <Route path="view-entity" element={<ViewCompany />} />
                <Route path="dashboard/" element={<DashboardLayout />}>
                  <Route path="create-entity" element={<CreateEntity />} />
                  <Route path="update-entity/:id" element={<UpdateEntity />} />
                  <Route
                    path="update-employee/:id"
                    element={<UpdateEmployee />}
                  />
                  <Route path="create-employee" element={<CreateEmployee />} />
                  <Route
                    path="create-employee-loan/:id"
                    element={<CreateEmployeeLoan />}
                  />
                  <Route
                    path="create-allowable-deductions"
                    element={<CreateAllowableDeductions />}
                  />
                  <Route
                    path="create-income-type"
                    element={<CreateIncomeType />}
                  />
                  <Route
                    path="create-allowable-deductions"
                    element={<CreateIncomeType />}
                  />
                  <Route path="run-payroll" element={<RunPayroll />} />
                  <Route path="manage-entity/:id" element={<ManageEntity />} />
                  <Route
                    path="manage-employees"
                    element={<ManageEmployees />}
                  />
                </Route>
                <Route path="/employee" element={<EmployeeDashboardLayout />}>
                  <Route path="update-employee" element={<UpdateEmployee />} />
                </Route>
              </>
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
