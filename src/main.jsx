import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";

import Home from "@/pages/home";
import Signup from "@/pages/signup";
import "@/styles/globals.css";
// import Root, { rootLoader } from "./routes/root";
// import Team, { teamLoader } from "./routes/team";

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
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
