// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Routes data
export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    showInNavbar: true,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
  {
    path: "/in",
    name: "Login",
    component: Login,
    showInNavbar: false,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    showInNavbar: false,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
];
