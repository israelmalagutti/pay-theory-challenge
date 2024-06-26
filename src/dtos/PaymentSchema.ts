import { z } from "zod";

const FeeModeSchema = z.enum(["merchant", "payor"], {
  message: "Invalid fee mode.",
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

export type PaymentType = z.infer<typeof PaymentSchema>;
