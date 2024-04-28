import { lazy } from "react";

export const defaultRoute = "/";

export const router = [
  {
    path: "/login",
    component: lazy(() => import("../components/Auth/Index.jsx")),
  },
];
