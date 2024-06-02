import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import "tw-elements";
import Home from "@/pages/home";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import "@/styles/globals.css";
import DashboardLayout from "./pages/dashboard_layout/_page";
import ManageEmployees from "./pages/manage_employees/_page";
import ManageCompany from "./pages/manage_company/_page";
import ViewCompany from "./pages/view_company/_page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./pages/appRoutes";
import store from "./core/stores";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorBoundary />,
//     // loader: rootLoader,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "signup",
//         element: <Signup />,
//         // loader: teamLoader,
//       },
//       {
//         path: "login",
//         element: <Login />,
//         // loader: teamLoader,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: <DashboardLayout />,
//     errorElement: <ErrorBoundary />,
//     children: [
//       {
//         path: "dashboard",
//         element: <ManageEmployees />,
//       },
//       {
//         path: "manage-company",
//         element: <ManageCompany />,
//       },
//       {
//         path: "view-company",
//         element: <ViewCompany />,
//       },
//     ],
//   },
// ]);

const root = createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <ToastContainer progressClassName="toast-progress" />
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
