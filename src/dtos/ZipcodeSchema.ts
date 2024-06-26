import { z } from "zod";

export const ZipcodeSchema = z.string().min(1, {
  message: "Please enter a valid zipcode for this payment.",
});

export type ZipcodeType = z.infer<typeof ZipcodeSchema>;
