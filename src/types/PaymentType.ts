export type FeeType = "merchant" | "payor";

export type PaymentType = {
  amount: string;

  feeMode: FeeType;

  name: string;
  description: string;

  accountNumber: string;
};
