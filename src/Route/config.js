import { lazy } from "react";

export const defaultRoute = "/";
export const token = localStorage.getItem("token");
export const router = [
  {
    path: "/login",
    component: lazy(() => import("../components/Auth/Login/Index.jsx")),
  },
  {
    path: "/signup",
    component: lazy(() => import("../components/Auth/Register/Index.jsx")),
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../components/Auth/Dashboard/Index.jsx")),
  },
];
