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
import CreatePrice from "./create_price/_page";
import CreateTaxType from "./create_tax_type/_page";
import TaxOperatorLayout from "./tax_operator_layout/_page";
import ManageTaxRate from "./manage_tax_rate/_page";
import UpdateTaxOperatorRate from "./update_tax_operator_rate/_page";
import TermsAndConditions from "./terms_and_conditions/_page";
import TaxSettings from "./tax_settings/_page";
import TaxSettingsDashboardLayout from "./tax_settings_dashboard_layout/_page";
import UpdateIncomeType from "./update_income_type/_page";
import SuperCreateTaxRate from "./view_tax_rate/_page";
import SuperManageTaxRate from "./update_tax_rate/_page";
import CreateTaxComponent from "./create_tax_component/_page";
import SuperUpdateTaxRate from "./super_update_tax_rate/_page";
import ResetPassword from "./reset_password/_page";
import ManageTaxElection from "./manage_tax_settings/_page";
import UpdateTaxElection from "./update_tax_election/_page";
import ViewEmployeesPensions from "./manage_employees_pensions/_page";
import UpdateEmployeePension from "./update_employee_pension/_page";
import CreateEmployeePensionPage from "./create_employee_pensions/_page";
import ManageEmployeesPensions from "./manage_employees_pensions/_page";
import AccessDenied from "./access_denied/_page";
import CreateSubscription from "./create_subscription/_page";
import { GetSubscriptions } from "../core/services/pricing.service";

export default function AppRoutes() {
  const [userSession] = React.useState(getUserSession());
  const entity_id = localStorage.getItem("entity_id");
  const [checkForPayment, setCheckForPayment] = React.useState();

  React.useEffect(() => {
    if (entity_id !== "" || entity_id !== null) {
      GetSubscriptions(entity_id)
        .then((response) => {
          console.log("ads: ", response.data.subscriptions);
          setCheckForPayment(response.data.subscriptions);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer progressClassName="toast-progress" />
      <Routes>
        {!userSession ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="verify_user" element={<VerifyUser />} />
            <Route path="reset_password" element={<ResetPassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="setup-organization" element={<SetUpOrganizatoin />} />
            <Route path="*" element={<Login />} />
          </Route>
        ) : (
          <>
            {isMobile ? (
              <Route path="view-entity" element={<MobileScreen />} />
            ) : (
              <>
                <Route path="view-entity" element={<ViewCompany />} />
                <Route
                  path="select-subscription"
                  element={<CreateSubscription />}
                />
                {checkForPayment && checkForPayment.length === 0 ? (
                  <>
                    <Route
                      path="select-subscription"
                      element={<CreateSubscription />}
                    />
                  </>
                ) : (
                  <>
                    <Route path="dashboard/" element={<DashboardLayout />}>
                      <Route
                        path="view-employees"
                        element={<ViewEmployees />}
                      />
                      <Route
                        path="manage-employees-pensions"
                        element={<ManageEmployeesPensions />}
                      />
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
                        path="create-employee-pensions/:id"
                        element={<CreateEmployeePensionPage />}
                      />
                      <Route
                        path="update-employee-pension/:id"
                        element={<UpdateEmployeePension />}
                      />
                      <Route
                        path="update-employee-loan/:id"
                        element={<UpdateEmployeeLoan />}
                      />
                      <Route
                        path="update-income-type/:id"
                        element={<UpdateIncomeType />}
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
              </>
            )}
            {checkForPayment && checkForPayment.length === 0 ? (
              <>
                <Route
                  path="select-subscription"
                  element={<CreateSubscription />}
                />
              </>
            ) : (
              <>
                <Route
                  path="dashboard/"
                  element={<TaxSettingsDashboardLayout />}
                >
                  <Route path="tax-settings" element={<TaxSettings />} />
                  <Route
                    path="manage-tax-election"
                    element={<ManageTaxElection />}
                  />
                  <Route
                    path="update-tax-election/:id/:tax_rate_uid"
                    element={<UpdateTaxElection />}
                  />
                </Route>
              </>
            )}

            <Route path="/employee" element={<EmployeeDashboardLayout />}>
              <Route path="update-employee" element={<UpdateEmployee />} />
              <Route path="employee-payslip" element={<Payslip />} />
            </Route>
            <Route path="/super" element={<SuperAdminDashboardLayout />}>
              <Route path="create-tax-rate" element={<SuperCreateTaxRate />} />
              <Route path="manage-tax-rate" element={<SuperManageTaxRate />} />
              <Route
                path="update-tax-rate/:id"
                element={<SuperUpdateTaxRate />}
              />
              <Route path="create-price" element={<CreatePrice />} />

              <Route
                path="create-tax-component"
                element={<CreateTaxComponent />}
              />
              <Route path="create-tax-type" element={<CreateTaxType />} />
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditions />}
              />
            </Route>
            <Route path="/tax-operator" element={<TaxOperatorLayout />}>
              <Route path="create-tax-rate" element={<SuperAdminDashboard />} />
              <Route path="manage-tax-rate" element={<ManageTaxRate />} />
              <Route
                path="update-tax-rate/:id"
                element={<UpdateTaxOperatorRate />}
              />
            </Route>
          </>
        )}{" "}
        <Route path="*" element={<AccessDenied />} />
        {/* Redirect to AccessDenied for unmatched routes */}
        {/* <Route path="access-denied" element={<AccessDenied />} /> */}
        {/* <Route path="*" element={<AccessDenied />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
