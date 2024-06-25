import { createBrowserRouter } from "react-router-dom";

import { CustomLayout } from "@/components";

import { Payments } from "@/pages/Payments";
import { PaymentFeedback } from "@/pages/Payments/Feedback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomLayout />,
    children: [
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
