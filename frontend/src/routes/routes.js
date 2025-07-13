import { lazy } from "react";

// Routes data
export const routes = [
  {
    path: "/",
    name: "Home",
    component: lazy(() => import("../pages/Home")),
    showInNavbar: true,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
  {
    path: "/in",
    name: "Login",
    component: lazy(() => import("../pages/Login")),
    showInNavbar: false,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
  {
    path: "/register",
    name: "Register",
    component: lazy(() => import("../pages/Register")),
    showInNavbar: false,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
];
