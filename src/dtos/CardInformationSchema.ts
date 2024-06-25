import { z } from "zod";

export const CardInformationSchema = z.object({
  name: z.string().min(1, {
    message: "Invalid name. Please enter the name from your card for payment.",
  }),
  number: z.string().min(1, {
    message: "Invalid card number. Please enter your card number for payment.",
  }),
  expirationDate: z.string().min(1, {
    message:
      "Invalid expiration date. Please enter your expiration date for payment.",
  }),
  zipcode: z.string().min(1, {
    message: "Invalid zipcode. Please enter your zipcode for payment.",
  }),
});

export type CardInformationType = z.infer<typeof CardInformationSchema>;
