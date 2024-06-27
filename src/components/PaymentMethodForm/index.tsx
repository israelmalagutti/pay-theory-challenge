import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";

import { usaStates } from "@/utils";

import { ManualPaymentType, PaymentMethodType } from "@/dtos";

import { BillingAddressForm } from "../BillingAddressForm";
import { CardInformationForm } from "../CardInformationForm";
import { ContactInformationForm } from "../ContactInformationForm";
import { HomeAddressForm } from "../HomeAddressForm";
import { SubmitButton } from "../SubmitButton";
import { Button, Card, Flex, FormInstance, Typography } from "antd";

import styles from "./styles.module.scss";

type Props = {
  form: FormInstance<ManualPaymentType>;

  sameAddress: boolean;
  setSameAddress: Dispatch<SetStateAction<boolean>>;

  isSubmitting: boolean;
  isFormValid?: boolean;
};

const { Text, Title, Link } = Typography;

export function PaymentMethodForm({
  form,
  sameAddress,
  setSameAddress,

  isFormValid,
  isSubmitting,
}: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("card");

  const states = usaStates.map(state => ({
    label: state.name,
    value: state.name.toLowerCase(),
  }));

  return (
    <Card
      title={
        <Title level={3} style={{ margin: 0 }}>
          Select Payment Method
        </Title>
      }
      className={styles.paymentCard}
      styles={{
        header: {
          padding: "1rem 1rem 0",
          border: "none",
        },
        body: { padding: "0 1rem 1.5rem" },
      }}
    >
      <Flex className={styles.paymentSelectionContainer}>
        <Button
          type={(paymentMethod === "card" && "primary") || "text"}
          onClick={() => setPaymentMethod("card")}
          className={clsx(paymentMethod === "ach" && styles.selectionButton)}
          style={{ flex: 1 }}
        >
          Card
        </Button>

        <Button
          type={(paymentMethod === "ach" && "primary") || "text"}
          onClick={() => setPaymentMethod("ach")}
          className={clsx(paymentMethod === "card" && styles.selectionButton)}
          style={{ flex: 1 }}
        >
          ACH
        </Button>
      </Flex>

      <Flex className={styles.paymentMethodForm}>
        {paymentMethod === "card" ? (
          <>
            <ContactInformationForm form={form} />

            <HomeAddressForm form={form} states={states} />

            <CardInformationForm form={form} />

            <BillingAddressForm
              form={form}
              states={states}
              sameAddress={sameAddress}
              setSameAddress={setSameAddress}
            />

            <Flex vertical gap={4}>
              <SubmitButton
                isSubmitting={isSubmitting}
                isDisabled={!isFormValid}
              >
                Submit Payment
              </SubmitButton>

              <Flex
                vertical
                align="center"
                justify="center"
                style={{ paddingTop: "0.5rem" }}
              >
                <Text>By submitting this payment you agree to the</Text>

                <Text>
                  <Link href="https://vimeo.com/794492622">privacy policy</Link>
                  ,{" "}
                  <Link href="https://vimeo.com/794492622">refund policy</Link>,{" "}
                  <Link href="https://vimeo.com/794492622">
                    terms of service
                  </Link>
                  .
                </Text>
              </Flex>
            </Flex>
          </>
        ) : (
          <Flex align="center" justify="center">
            <Title level={5}>Coming soon!</Title>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
