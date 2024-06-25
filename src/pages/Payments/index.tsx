import { useEffect, useLayoutEffect, useState } from "react";

import { manualPaymentSchema, ManualPaymentType } from "@/dtos";

import { usaStates } from "@/utils";

import { Header, Sidebar } from "@/components";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  Select,
  Typography,
  message,
} from "antd";

import styles from "./styles.module.scss";

import { CreditCardOutlined } from "@ant-design/icons";

const { Content } = Layout;

const CURRENT_FUNDS = 500;

export function Payments() {
  const [form] = Form.useForm<ManualPaymentType>();
  const fields = Form.useWatch([], form);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "ach">("card");
  const [sameAddress, setSameAddress] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const states = usaStates.map(state => ({
    label: state.name,
    value: state.name.toLowerCase(),
  }));

  async function handleSubmit(formData: ManualPaymentType) {
    try {
      console.log({ formData });
      const { billingAddress, homeAddress, payment } = formData;

      const data: ManualPaymentType = {
        ...formData,
        billingAddress: sameAddress ? homeAddress : billingAddress,
      };

      if (Number(payment.amount) > CURRENT_FUNDS) {
        throw new Error("Insufficient Funds");
      }

      const { data: parsedData } = await manualPaymentSchema.safeParseAsync(
        data
      );

      console.log({ parsedData });
    } catch (error) {
      error instanceof Error && message.error(`Error: ${error.message}`);
    }
  }

  useEffect(() => {
    async function formValidation() {
      try {
        await form.validateFields();
        setIsSubmittable(true);
      } catch (error) {
        setIsSubmittable(false);
      }
    }

    formValidation();
  }, [form, fields]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout draggable={false} className={styles.layout}>
      <Header />

      <Layout
        hasSider
        className={styles.contentContainer}
        style={{
          maxHeight: windowHeight - 48,
        }}
      >
        <Sidebar />

        <Content className={styles.content}>
          <Breadcrumb
            items={[
              {
                href: "/payments",
                title: "Payments",
              },
              {
                href: "/create-payment",
                title: "Create a Payment",
              },
              {
                href: "matimme",
                title: "Accept a Manual Payment",
              },
            ]}
            className={styles.breadcrumb}
            style={{
              display: "flex",
              alignItems: "center",
              height: "fit-content",
              width: "100%",
            }}
          ></Breadcrumb>

          <Layout className={styles.rootFormContainer}>
            <Typography.Title
              className={styles.title}
              editable={false}
              level={2}
            >
              Accept a Manual Payment
            </Typography.Title>

            <Form
              form={form}
              layout="vertical"
              initialValues={{ feeMode: "merchant" }}
              onFinish={data => handleSubmit(data)}
              className={styles.formContainer}
              requiredMark={false}
            >
              <Flex vertical flex={1} className={styles.paymentDetailsForm}>
                <Form.Item
                  hasFeedback
                  label="Amount"
                  htmlFor="paymentAmount"
                  name={["payment", "amount"]}
                  rules={[
                    { required: true, message: "Please enter an amount." },
                  ]}
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

                <Form.Item
                  hasFeedback
                  label="Fee mode"
                  name={["payment", "feeMode"]}
                  rules={[
                    { required: true, message: "Please select a fee mode." },
                  ]}
                >
                  <Flex
                    gap={16}
                    style={{ padding: "0.625rem 0", marginTop: "0.25rem" }}
                  >
                    <Checkbox
                      className={styles.checkbox}
                      checked={form.getFieldValue("feeMode") === "merchant"}
                      onClick={() => form.setFieldValue("feeMode", "merchant")}
                    >
                      Merchant Pays Fee
                    </Checkbox>

                    <Checkbox
                      className={styles.checkbox}
                      checked={form.getFieldValue("feeMode") === "payor"}
                      onClick={() => form.setFieldValue("feeMode", "payor")}
                    >
                      Payor Pays Fee
                    </Checkbox>
                  </Flex>
                </Form.Item>

                <Form.Item
                  hasFeedback
                  label="Payment Name"
                  htmlFor="paymentName"
                  name={["payment", "name"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a name for your payment.",
                    },
                  ]}
                >
                  <Input
                    id="paymentName"
                    placeholder="Name of the item or service..."
                    value={form.getFieldValue("name")}
                    onChange={event =>
                      form.setFieldValue("name", event.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  hasFeedback
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
                  hasFeedback
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

              <Card
                title={
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Select Payment Method
                  </Typography.Title>
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
                    className={styles.selectionButton}
                  >
                    Card
                  </Button>

                  <Button
                    type={(paymentMethod === "ach" && "primary") || "text"}
                    onClick={() => setPaymentMethod("ach")}
                    className={styles.selectionButton}
                  >
                    ACH
                  </Button>
                </Flex>

                <Flex className={styles.paymentMethodForm}>
                  {paymentMethod === "card" ? (
                    <>
                      <Flex vertical gap={4}>
                        <Typography.Title level={5} className={styles.label}>
                          Contact Information
                        </Typography.Title>

                        <Flex vertical gap={8}>
                          <Flex gap={8}>
                            <Form.Item
                              hasFeedback
                              noStyle
                              name={["contact", "firstName"]}
                              rules={[{ required: true }]}
                            >
                              <Input
                                autoCapitalize="words"
                                value={form.getFieldValue("firstName")}
                                onChange={event =>
                                  form.setFieldValue(
                                    "firstName",
                                    event.target.value
                                  )
                                }
                                placeholder="First name"
                              />
                            </Form.Item>

                            <Form.Item
                              hasFeedback
                              noStyle
                              name={["contact", "lastName"]}
                              rules={[{ required: true }]}
                            >
                              <Input
                                // addonAfter={<XCircleOutlined />}
                                autoCapitalize="words"
                                value={form.getFieldValue("lastName")}
                                onChange={event =>
                                  form.setFieldValue(
                                    "lastName",
                                    event.target.value
                                  )
                                }
                                placeholder="Last name"
                              />
                            </Form.Item>
                          </Flex>

                          <Form.Item
                            hasFeedback
                            noStyle
                            name={["contact", "email"]}
                            rules={[{ required: true }]}
                          >
                            <Input
                              placeholder="Email address"
                              value={form.getFieldValue("email")}
                              onChange={event =>
                                form.setFieldValue("email", event.target.value)
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            hasFeedback
                            noStyle
                            name={["contact", "phone"]}
                            rules={[{ required: true }]}
                          >
                            <Input
                              placeholder="Phone number (optional)"
                              value={form.getFieldValue("phone")}
                              onChange={event =>
                                form.setFieldValue("phone", event.target.value)
                              }
                            />
                          </Form.Item>
                        </Flex>
                      </Flex>

                      <Flex vertical gap={4}>
                        <Typography.Title level={5} className={styles.label}>
                          Home Address
                        </Typography.Title>

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
                                onChange={value =>
                                  form.setFieldValue("state", value)
                                }
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
                                  form.setFieldValue(
                                    "zipcode",
                                    event.target.value
                                  )
                                }
                                style={{ flex: 1 }}
                              />
                            </Form.Item>
                          </Flex>
                        </Flex>
                      </Flex>

                      <Flex vertical gap={4}>
                        <Typography.Title level={5} className={styles.label}>
                          Card Information
                        </Typography.Title>

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
                                  form.setFieldValue(
                                    "number",
                                    event.target.value
                                  )
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
                                  form.setFieldValue(
                                    "expirationDate",
                                    event.target.value
                                  )
                                }
                                maxLength={7}
                              />
                            </Form.Item>

                            <Form.Item
                              hasFeedback
                              noStyle
                              required
                              name={["card", "zipcode"]}
                              rules={[{ required: true }]}
                            >
                              <Input
                                placeholder="Zipcode"
                                value={form.getFieldValue("zipcode")}
                                onChange={event =>
                                  form.setFieldValue(
                                    "zipcode",
                                    event.target.value
                                  )
                                }
                              />
                            </Form.Item>
                          </Flex>
                        </Flex>
                      </Flex>

                      <Flex vertical gap={4}>
                        <Typography.Title level={5} className={styles.label}>
                          Billing Address
                        </Typography.Title>

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
                              name="billingAddress1"
                              rules={[{ required: true }]}
                            >
                              <Input
                                placeholder="Address line 1"
                                value={form.getFieldValue("billingAddress1")}
                                onChange={event =>
                                  form.setFieldValue(
                                    "billingAddress1",
                                    event.target.value
                                  )
                                }
                              />
                            </Form.Item>
                            <Form.Item noStyle name="billingAddress2">
                              {" "}
                              hasFeedback
                              <Input
                                placeholder="Address line 2 (optional)"
                                value={form.getFieldValue("billingAddress2")}
                                onChange={event =>
                                  form.setFieldValue(
                                    "billingAddress2",
                                    event.target.value
                                  )
                                }
                              />
                            </Form.Item>

                            <Flex gap={8}>
                              <Form.Item
                                hasFeedback
                                noStyle
                                name="billingCity"
                                rules={[{ required: true }]}
                              >
                                <Input
                                  placeholder="City"
                                  value={form.getFieldValue("billingCity")}
                                  onChange={event =>
                                    form.setFieldValue(
                                      "billingCity",
                                      event.target.value
                                    )
                                  }
                                  style={{ flex: 1 }}
                                />
                              </Form.Item>

                              <Form.Item
                                noStyle
                                name="billingState"
                                rules={[{ required: true }]}
                              >
                                <Select
                                  placeholder="State"
                                  options={states}
                                  value={form.getFieldValue("billingState")}
                                  onChange={value =>
                                    form.setFieldValue("billingState", value)
                                  }
                                  style={{ flex: 1 }}
                                />
                              </Form.Item>

                              <Form.Item
                                hasFeedback
                                noStyle
                                name="billingZipcode"
                                rules={[{ required: true }]}
                              >
                                <Input
                                  placeholder="Zipcode"
                                  value={form.getFieldValue("billingZipcode")}
                                  onChange={event =>
                                    form.setFieldValue(
                                      "billingZipcode",
                                      event.target.value
                                    )
                                  }
                                  style={{ flex: 1 }}
                                />
                              </Form.Item>
                            </Flex>
                          </Flex>
                        )}
                      </Flex>

                      <Flex vertical gap={4}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={!isSubmittable}
                          style={{ boxShadow: "none" }}
                        >
                          Submit Payment
                        </Button>

                        <Flex
                          vertical
                          align="center"
                          justify="center"
                          style={{ paddingTop: "0.5rem" }}
                        >
                          <Typography.Text>
                            By submitting this payment you agree to the
                          </Typography.Text>

                          <Typography.Text>
                            <Typography.Link href="https://vimeo.com/794492622">
                              privacy policy
                            </Typography.Link>
                            ,{" "}
                            <Typography.Link href="https://vimeo.com/794492622">
                              refund policy
                            </Typography.Link>
                            ,{" "}
                            <Typography.Link href="https://vimeo.com/794492622">
                              terms of service
                            </Typography.Link>
                            .
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    </>
                  ) : (
                    <Flex align="center" justify="center">
                      <Typography.Title level={5}>
                        Coming soon!
                      </Typography.Title>
                    </Flex>
                  )}
                </Flex>
              </Card>
            </Form>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
