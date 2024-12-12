import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage } from "@/pages/AuthPage/AuthPage.jsx";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
