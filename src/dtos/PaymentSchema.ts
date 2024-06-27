import { z } from "zod";

const FeeModeSchema = z.enum(["merchant", "payor"], {
  message: "Invalid fee mode.",
});

export const PaymentMethodSchema = z.enum(["card", "ach"], {
  message: "Invalid payment method.",
});

export const PaymentSchema = z.object({
  accountNumber: z.string().nullish(),
  amount: z.number().gt(0),
  description: z.string().nullish(),
  feeMode: FeeModeSchema,
  name: z.string().min(1, {
    message: "Invalid title. Please enter a name for your payment.",
  }),
});

export type FeeModeType = z.infer<typeof FeeModeSchema>;

export type PaymentMethodType = z.infer<typeof PaymentMethodSchema>;

export type PaymentType = z.infer<typeof PaymentSchema>;
