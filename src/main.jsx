import { Provider } from "@/components/ui/provider";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const AuthPage = lazy(() => import("@/pages/AuthPage/AuthPage"));
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
const SearchPage = lazy(() => import("@/pages/SearchPage/SearchPage"));
import { SpinnerCircular } from "spinners-react";
import { Center } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":userName",
        element: <ProfilePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Suspense
        fallback={
          <Center my={100}>
            <SpinnerCircular
              thickness={100}
              speed={100}
              color="rgba(57, 172, 140, 1)"
              secondaryColor="rgba(0, 0, 0, 1)"
            />
          </Center>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
