import { z } from "zod";

export const ContactSchema = z.object({
  firstName: z.string().min(1, {
    message: "Invalid name. Please enter a name for your contact.",
  }),
  lastName: z.string().min(1, {
    message: "Invalid name. Please enter a name for your contact.",
  }),
  email: z.string().email({
    message: "Invalid email. Please enter a valid email for your contact.",
  }),
  phone: z.string().nullish(),
});

export type ContactType = z.infer<typeof ContactSchema>;
