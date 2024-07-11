import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Signup from "./signup";
import Login from "./login";
import DashboardLayout from "./dashboard_layout/_page";
import ManageEmployees from "./manage_employees/_page";
import ManageEntity from "./manage_entity/_page";
import ViewCompany from "./view_company/_page";
import ViewEmployees from "./view_employees/_page";
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
import TerminateEmployee from "./terminate_employee/_page";
import TerminatedEmployees from "./terminated_employees/_page";
import ManageEmployeeLoans from "./manage_employee_loans/_page";
import UpdateEmployeeLoan from "./update_employee_loan/_page";
import MySpreadsheet from "./run_payroll/another";
import SavedReports from "./saved_reports/_page";
import TaxReportDetails from "./tax_report_details/_page";
import UpdateAdminEmployee from "./update_admin_employee/_page";
import SetUpOrganizatoin from "./setup_organization/_page";
import Pricing from "./pricing/_page";
import Payslip from "./payslip/_page";
import SuperAdminDashboardLayout from "./super_admin_dashboard_layout/_page";
import SuperAdminDashboard from "./super_admin_dashboard/_page";
import VerifyUser from "./verify_user/_page";
import ViewTaxRate from "./view_tax_rate/_page";
import UpdateTaxRate from "./update_tax_rate/_page";
import CreatePrice from "./create_price/_page";
import AccessDenied from "./access_denied/_page";

export default function AppRoutes() {
  const [userSession] = React.useState(getUserSession());
  const role = localStorage.getItem("u_role");
  console.log("Role: " + role);
  return (
    <BrowserRouter>
      <ToastContainer progressClassName="toast-progress" />
      <Routes>
        {!userSession ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="verify_user" element={<VerifyUser />} />
            <Route path="*" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="pricing" element={<Pricing />} />

            <Route path="setup-organization" element={<SetUpOrganizatoin />} />
          </Route>
        ) : (
          <>
            <>
              {isMobile ? (
                <Route path="view-entity" element={<MobileScreen />} />
              ) : (
                <>
                  <Route path="view-entity" element={<ViewCompany />} />
                  <Route path="dashboard/" element={<DashboardLayout />}>
                    <Route path="view-employees" element={<ViewEmployees />} />
                    <Route path="create-entity" element={<CreateEntity />} />
                    <Route
                      path="update-entity/:id"
                      element={<UpdateEntity />}
                    />
                    <Route
                      path="update-employee/:id"
                      element={<UpdateAdminEmployee />}
                    />
                    <Route
                      path="create-employee"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="create-employee-loan/:id"
                      element={<CreateEmployeeLoan />}
                    />
                    <Route
                      path="terminate-employee/:id"
                      element={<TerminateEmployee />}
                    />
                    <Route
                      path="terminated-employees/:id"
                      element={<TerminatedEmployees />}
                    />
                    <Route
                      path="manage-employee-loans/:id"
                      element={<ManageEmployeeLoans />}
                    />
                    <Route
                      path="update-employee-loan/:id"
                      element={<UpdateEmployeeLoan />}
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
                    <Route path="run-payroll" element={<MySpreadsheet />} />
                    <Route path="saved-reports" element={<SavedReports />} />
                    <Route
                      path="tax-report-details/:id"
                      element={<TaxReportDetails />}
                    />
                    <Route
                      path="manage-entity/:id"
                      element={<ManageEntity />}
                    />
                    <Route
                      path="manage-employees"
                      element={<ManageEmployees />}
                    />
                  </Route>
                </>
              )}
              <Route path="/employee" element={<EmployeeDashboardLayout />}>
                <Route path="update-employee" element={<UpdateEmployee />} />
                <Route path="employee-payslip" element={<Payslip />} />
              </Route>
              <>
                {role === "" ? (
                  <Route path="/super" element={<SuperAdminDashboardLayout />}>
                    <Route path="home" element={<SuperAdminDashboard />} />
                    <Route path="view-tax-rate" element={<ViewTaxRate />} />
                    <Route path="update-tax-rate" element={<UpdateTaxRate />} />
                    <Route path="create-price" element={<CreatePrice />} />
                    <Route path="verify_user" element={<VerifyUser />} />
                  </Route>
                ) : (
                  <Route path="access-denied" element={<AccessDenied />} />
                )}
              </>
            </>
          </>
        )}
        {/* Redirect to AccessDenied for unmatched routes */}
        <Route path="access-denied" element={<AccessDenied />} />
        <Route path="*" element={<Navigate to="access-denied" />} />
      </Routes>
    </BrowserRouter>
  );
}
