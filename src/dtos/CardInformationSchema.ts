import { z } from "zod";

export const CardInformationSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a valid name from your card for this card.",
  }),
  number: z.string().min(1, {
    message: "Please enter a valid card number for this card.",
  }),
  expirationDate: z.string().min(1, {
    message: "Please enter a valid expiration date for this card.",
  }),
  cvv: z.string().min(3, "Please enter a valid CVV for this card."),
});

export type CardInformationType = z.infer<typeof CardInformationSchema>;
