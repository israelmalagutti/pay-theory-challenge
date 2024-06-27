import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";

import { FeeModeType, ManualPaymentType, manualPaymentSchema } from "@/dtos";

import { Form, Layout, Typography, message } from "antd";

import styles from "./styles.module.scss";
import { PaymentMethodForm } from "@/components/PaymentMethodForm";
import { PaymentInformationForm } from "@/components/PaymentInformationForm";

const CURRENT_FUNDS = 500;

export function Payments() {
  const navigate = useNavigate();
  const [form] = Form.useForm<ManualPaymentType>();

  const [selectedFee, setSelectedFee] = useState<FeeModeType>("merchant");

  const [sameAddress, setSameAddress] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState<boolean | undefined>(false);

  const validateForm = useCallback(() => {
    const values = form.getFieldsValue();

    const data = {
      ...values,
      payment: { ...values.payment, feeMode: selectedFee },
      billingAddress: sameAddress ? values.homeAddress : values.billingAddress,
    };

    const { error } = manualPaymentSchema.safeParse(data);

    if (error) return setIsFormValid(false);

    setIsFormValid(true);
  }, [form, selectedFee, sameAddress]);

  async function handleSubmit(formData: ManualPaymentType) {
    try {
      setIsSubmitting(true);

      console.log({ formData });
      const { billingAddress, homeAddress, payment } = formData;

      const data: ManualPaymentType = {
        ...formData,
        payment: {
          ...formData.payment,
          feeMode: selectedFee,
        },
        billingAddress: sameAddress ? homeAddress : billingAddress,
      };

      if (Number(payment.amount) > CURRENT_FUNDS) {
        throw new Error("Insufficient Funds");
      }

      const parsedData = manualPaymentSchema.parse(data);

      console.log({ data: parsedData });

      message.success("Payment Succeeded");
      navigate("/feedback");
    } catch (error) {
      error instanceof ZodError && console.error({ error });

      error instanceof Error && message.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    validateForm();
  }, [validateForm, sameAddress]);

  return (
    <Layout className={styles.rootFormContainer}>
      <Typography.Title className={styles.title} editable={false} level={2}>
        Accept a Manual Payment
      </Typography.Title>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ feeMode: "merchant" }}
        onFieldsChange={validateForm}
        onFinish={data => handleSubmit(data)}
        className={styles.formContainer}
        requiredMark={"optional"}
      >
        <PaymentInformationForm
          form={form}
          selectedFee={selectedFee}
          setSelectedFee={setSelectedFee}
        />

        <PaymentMethodForm
          form={form}
          sameAddress={sameAddress}
          setSameAddress={setSameAddress}
          isFormValid={isFormValid}
          isSubmitting={isSubmitting}
        />
      </Form>
    </Layout>
  );
}
