import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/UsersPage";
import DevicesPage from "./pages/admin/DevicesPage";

// Naya Guard Import karein
import ProtectedRoute from "./components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  // =====================
  // PUBLIC ROUTES
  // =====================
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },

  // =====================
  // ADMIN LOGIN PAGE
  // =====================
  {
    path: "/admin/login",
    Component: AdminLogin,
  },

  // =====================
  // PROTECTED ADMIN ROUTES
  // =====================
  {
    path: "/admin",
    Component: ProtectedRoute, // <-- Yahan Guard laga diya!
    children: [
      { index: true, Component: Dashboard },         // /admin
      { path: "users", Component: UsersPage },       // /admin/users
      { path: "devices", Component: DevicesPage },   // /admin/devices
    ],
  },
]);