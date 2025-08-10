import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

import { lazy } from "react";
import RootLayout from "../components/layouts/RootLayout.jsx";
import { routes } from "./routes.js";

// Create root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Generate children directly from routes.js
const childRoutes = routes.map((route) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: route.path,
    component: lazy(() => import(`../pages/${route.name}.jsx`)), // File path
  }),
);

// Combine into route tree
const routeTree = rootRoute.addChildren(childRoutes);

// Create router
export const router = createRouter({ routeTree });
