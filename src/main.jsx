import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";

/**
 * Define the routes for the application using createBrowserRouter.
 * - "/" path renders the Login component.
 * - "/World" path renders the World component.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Render the Login component at the root path.
  },
]);

/**
 * The main entry point for rendering the React application.
 * It uses createRoot to attach the React app to the DOM element with the ID "root".
 * The application is wrapped in StrictMode for highlighting potential issues in the app.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <RouterProvider router={router} /> {/* Provide the router to the app, enabling navigation between routes. */}
  </StrictMode>
);
