import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

import RootLayout from "../components/layouts/RootLayout.jsx";
import { routes } from "./routes.js";

// Create root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Generate children from routes.js
const childRoutes = routes.map((route) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: route.path,
    component: () => route.load().then((mod) => mod.default),
  }),
);

// Combine into route tree
const routeTree = rootRoute.addChildren(childRoutes);

// Create router
export const router = createRouter({ routeTree });
