import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";

import { FeeModeType, ManualPaymentType, manualPaymentSchema } from "@/dtos";

import {
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  Typography,
  message,
} from "antd";

import styles from "./styles.module.scss";
import { PaymentMethodForm } from "@/components/PaymentMethodForm";

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
        <Flex vertical flex={1} className={styles.paymentDetailsForm}>
          <Form.Item
            hasFeedback
            label="Amount"
            htmlFor="paymentAmount"
            name={["payment", "amount"]}
            rules={[{ required: true }]}
          >
            <InputNumber
              id="paymentAmount"
              placeholder="00.00"
              addonBefore={"$"}
              value={form.getFieldValue("amount")}
              onChange={value =>
                form.setFieldValue(["payment", "amount"], value)
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item hasFeedback required label="Fee mode">
            <Flex
              gap={16}
              className={styles.feeModeContainer}
              style={{ padding: "0.625rem 0", marginTop: "0.25rem" }}
            >
              <Form.Item
                noStyle
                className={styles.checkboxContainer}
                style={{ margin: 0, padding: 0 }}
              >
                <Checkbox
                  className={styles.checkbox}
                  checked={selectedFee === "merchant"}
                  onClick={() => setSelectedFee("merchant")}
                >
                  Merchant Pays Fee
                </Checkbox>
              </Form.Item>

              <Form.Item noStyle className={styles.checkboxContainer}>
                <Checkbox
                  className={styles.checkbox}
                  checked={selectedFee === "payor"}
                  onClick={() => setSelectedFee("payor")}
                >
                  Payor Pays Fee
                </Checkbox>
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Payment Name"
            htmlFor="paymentName"
            name={["payment", "name"]}
            rules={[{ required: true }]}
          >
            <Input
              id="paymentName"
              placeholder="Name of the item or service..."
              value={form.getFieldValue("name")}
              onChange={event => form.setFieldValue("name", event.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Payment Description"
            htmlFor="paymentDescription"
            name={["payment", "description"]}
          >
            <Input.TextArea
              rows={4}
              id="paymentDescription"
              placeholder="Description of the item or service..."
              value={form.getFieldValue("description")}
              onChange={event =>
                form.setFieldValue("description", event.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Account Number"
            htmlFor="accountNumber"
            name={["payment", "accountNumber"]}
            required={false}
            style={{ marginBottom: 0 }}
          >
            <Input
              id="accountNumber"
              placeholder="A number that can be used to reference the payment"
              value={form.getFieldValue("accountNumber")}
              onChange={event =>
                form.setFieldValue("accountNumber", event.target.value)
              }
            />
          </Form.Item>
        </Flex>

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
