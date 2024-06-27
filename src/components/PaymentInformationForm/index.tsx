import { Checkbox, Flex, Form, FormInstance, Input, InputNumber } from "antd";

import styles from "./styles.module.scss";
import { FeeModeType } from "@/dtos";
import { Dispatch, SetStateAction } from "react";

type PaymentInformationFormProps = {
  form: FormInstance;

  selectedFee: FeeModeType;
  setSelectedFee: Dispatch<SetStateAction<FeeModeType>>;
};

export function PaymentInformationForm({
  form,
  selectedFee,
  setSelectedFee,
}: PaymentInformationFormProps) {
  return (
    <Flex vertical flex={1}>
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
          onChange={value => form.setFieldValue(["payment", "amount"], value)}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item hasFeedback required label="Fee mode">
        <Flex gap={16} style={{ padding: "0.625rem 0", marginTop: "0.25rem" }}>
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
  );
}
