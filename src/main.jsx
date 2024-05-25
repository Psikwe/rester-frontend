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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    // loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
        // loader: teamLoader,
      },
      {
        path: "login",
        element: <Login />,
        // loader: teamLoader,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "dashboard",
        element: <ManageEmployees />,
      },
      {
        path: "manage-company",
        element: <ManageCompany />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
