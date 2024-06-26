import { createBrowserRouter, redirect } from "react-router-dom";

import { CustomLayout } from "@/components";

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
