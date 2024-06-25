import { z } from "zod";

export const PaymentSchema = z.object({
  accountNumber: z.string().nullish(),
  amount: z.string().min(1, { message: "Invalid amount." }),
  description: z.string().nullish(),
  feeMode: z.enum(["merchant", "payor"], { message: "Invalid fee mode." }),
  name: z.string().min(1, {
    message: "Invalid title. Please enter a name for your payment.",
  }),
});

export type PaymentType = z.infer<typeof PaymentSchema>;
