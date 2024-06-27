import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";

import { usaStates } from "@/utils";

import { ManualPaymentType } from "@/dtos";

import { SubmitButton } from "../SubmitButton";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
} from "antd";

import styles from "./styles.module.scss";
import { CreditCardOutlined } from "@ant-design/icons";
import { ContactInformationForm } from "../ContactInformationForm";

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
  const [paymentMethod, setPaymentMethod] = useState<"card" | "ach">("card");

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
            <Flex vertical gap={4}>
              <Title level={5} className={styles.label}>
                Home Address
              </Title>

              <Flex vertical gap={8}>
                <Form.Item
                  hasFeedback
                  noStyle
                  name={["homeAddress", "addresses", "line1"]}
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Address line 1"
                    value={form.getFieldValue("line1")}
                    onChange={event =>
                      form.setFieldValue("line1", event.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  hasFeedback
                  noStyle
                  name={["homeAddress", "addresses", "line2"]}
                >
                  <Input
                    placeholder="Address line 2 (optional)"
                    value={form.getFieldValue("line2")}
                    onChange={event =>
                      form.setFieldValue("line2", event.target.value)
                    }
                  />
                </Form.Item>

                <Flex gap={8}>
                  <Form.Item
                    hasFeedback
                    noStyle
                    name={["homeAddress", "city"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="City"
                      value={form.getFieldValue("city")}
                      onChange={event =>
                        form.setFieldValue("city", event.target.value)
                      }
                      style={{ flex: 1 }}
                    />
                  </Form.Item>

                  <Form.Item
                    noStyle
                    name={["homeAddress", "state"]}
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="State"
                      options={states}
                      value={form.getFieldValue("state")}
                      onChange={value => form.setFieldValue("state", value)}
                      style={{ flex: 1 }}
                    />
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    noStyle
                    name={["homeAddress", "zipcode"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Zipcode"
                      value={form.getFieldValue("zipcode")}
                      onChange={event =>
                        form.setFieldValue("zipcode", event.target.value)
                      }
                      style={{ flex: 1 }}
                    />
                  </Form.Item>
                </Flex>
              </Flex>
            </Flex>

            <Flex vertical gap={4}>
              <Title level={5} className={styles.label}>
                Card Information
              </Title>

              <Flex vertical gap={8}>
                <Form.Item
                  hasFeedback
                  noStyle
                  required
                  name={["card", "name"]}
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Name on card"
                    value={form.getFieldValue("name")}
                    onChange={event =>
                      form.setFieldValue("name", event.target.value)
                    }
                  />
                </Form.Item>

                <Flex gap={8}>
                  <Form.Item
                    noStyle
                    required
                    name={["card", "number"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Card number"
                      value={form.getFieldValue("number")}
                      onChange={event =>
                        form.setFieldValue("number", event.target.value)
                      }
                      suffix={<CreditCardOutlined size={16} />}
                    />
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    noStyle
                    required
                    name={["card", "expirationDate"]}
                    rules={[{ required: true }, { max: 7 }]}
                  >
                    <Input
                      placeholder="MM/YYYY"
                      value={form.getFieldValue("expirationDate")}
                      onChange={event =>
                        form.setFieldValue("expirationDate", event.target.value)
                      }
                      maxLength={7}
                    />
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    noStyle
                    required
                    name={["card", "cvv"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="CVV"
                      value={form.getFieldValue("cvv")}
                      onChange={event =>
                        form.setFieldValue("cvv", event.target.value)
                      }
                    />
                  </Form.Item>
                </Flex>
              </Flex>
            </Flex>

            <Flex vertical gap={4}>
              <Title level={5} className={styles.label}>
                Billing Address
              </Title>

              <Checkbox
                checked={sameAddress}
                onClick={() => setSameAddress(prev => !prev)}
                style={{ padding: "0.625rem 0" }}
              >
                Same as address
              </Checkbox>

              {!sameAddress && (
                <Flex vertical gap={8}>
                  <Form.Item
                    hasFeedback
                    noStyle
                    name={["billingAddress", "addresses", "line1"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Address line 1"
                      value={form.getFieldValue("line1")}
                      onChange={event =>
                        form.setFieldValue("line1", event.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    hasFeedback
                    name={["billingAddress", "addresses", "line2"]}
                  >
                    <Input
                      placeholder="Address line 2 (optional)"
                      value={form.getFieldValue("line2")}
                      onChange={event =>
                        form.setFieldValue("line2", event.target.value)
                      }
                    />
                  </Form.Item>

                  <Flex gap={8}>
                    <Form.Item
                      hasFeedback
                      noStyle
                      name={["billingAddress", "city"]}
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="City"
                        value={form.getFieldValue("city")}
                        onChange={event =>
                          form.setFieldValue("city", event.target.value)
                        }
                        style={{ flex: 1 }}
                      />
                    </Form.Item>

                    <Form.Item
                      noStyle
                      name={["billingAddress", "state"]}
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder="State"
                        options={states}
                        value={form.getFieldValue("state")}
                        onChange={value => form.setFieldValue("state", value)}
                        style={{ flex: 1 }}
                      />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      noStyle
                      name={["billingAddress", "zipcode"]}
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="Zipcode"
                        value={form.getFieldValue("zipcode")}
                        onChange={event =>
                          form.setFieldValue("zipcode", event.target.value)
                        }
                        style={{ flex: 1 }}
                      />
                    </Form.Item>
                  </Flex>
                </Flex>
              )}
            </Flex>

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
