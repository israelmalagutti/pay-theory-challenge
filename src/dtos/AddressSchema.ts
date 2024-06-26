import { z } from "zod";

import { ZipcodeSchema } from "./ZipcodeSchema";

export const AddressSchema = z.object({
  addresses: z.object({
    line1: z.string().min(1, {
      message: "Please enter a valid line for your address.",
    }),
    line2: z.string().nullish(),
  }),
  city: z.string().min(1, {
    message: "Please enter a valid city for your address.",
  }),
  state: z.string().min(1, {
    message: "Please enter a valid state for your address.",
  }),
  zipcode: ZipcodeSchema,
});

export type AddressType = z.infer<typeof AddressSchema>;
