import { z } from "zod";

import { PaymentSchema } from "./PaymentSchema";
import { AddressSchema } from "./AddressSchema";
import { ContactSchema } from "./ContactSchema";
import { CardInformationSchema } from "./CardInformationSchema";

export const manualPaymentSchema = z.object({
  payment: PaymentSchema,

  billingAddress: AddressSchema,
  homeAddress: AddressSchema,

  contact: ContactSchema,
  card: CardInformationSchema,
});

export type ManualPaymentType = z.infer<typeof manualPaymentSchema>;
