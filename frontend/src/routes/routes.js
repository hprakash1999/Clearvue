export const routes = [
  {
    path: "/",
    name: "Home",
    showInNavbar: true,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
  {
    path: "/in",
    name: "Login",
    showInNavbar: false,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
  {
    path: "/register",
    name: "Register",
    showInNavbar: false,
    icon: null,
    protected: false,
    role: ["user", "admin"],
  },
  {
    path: "/settings",
    name: "Settings",
    showInNavbar: false,
    icon: null,
    protected: true,
    role: ["user", "admin"],
  },
];
