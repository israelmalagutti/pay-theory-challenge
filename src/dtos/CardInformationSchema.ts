import { z } from "zod";

import { ZipcodeSchema } from "./ZipcodeSchema";

export const CardInformationSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a valid name from your card for this payment.",
  }),
  number: z.string().min(1, {
    message: "Please enter a valid card number for this payment.",
  }),
  expirationDate: z.string().min(1, {
    message: "Please enter a valid expiration date for this payment.",
  }),
  zipcode: ZipcodeSchema,
});

export type CardInformationType = z.infer<typeof CardInformationSchema>;
