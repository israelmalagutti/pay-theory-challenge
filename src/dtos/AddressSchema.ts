import { z } from "zod";

export const AddressSchema = z.object({
  addresses: z.object({
    line1: z.string().min(1, {
      message: "Invalid address. Please enter a line for your address.",
    }),
    line2: z.string().nullish(),
  }),
  city: z.string().min(1, {
    message: "Invalid title. Please enter a name for your address.",
  }),
  state: z.string().min(1, {
    message: "Invalid title. Please enter a name for your address.",
  }),
  zipCode: z.string().min(1, {
    message: "Invalid title. Please enter a name for your address.",
  }),
});

export type AddressType = z.infer<typeof AddressSchema>;
