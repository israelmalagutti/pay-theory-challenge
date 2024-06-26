import { createBrowserRouter, redirect } from "react-router-dom";

import { CustomLayout } from "@/components";

import { Account } from "@/pages/Account";
import { Dashboard } from "@/pages/Dashboard";
import { Developers } from "@/pages/Developers";
import { Payments } from "@/pages/Payments";
import { PaymentFeedback } from "@/pages/Payments/Feedback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomLayout />,
    children: [
      {
        index: true,
        path: "/",
        loader: async () => redirect("/payments"),
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/developers",
        element: <Developers />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/feedback",
        element: <PaymentFeedback />,
      },
    ],
  },
]);
