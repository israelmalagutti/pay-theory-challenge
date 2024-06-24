import { useState } from "react";

import { usaStates } from "@/utils";

import { AddressType, CardType, ContactType, PaymentType } from "@/types";

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
  theme,
} from "antd";

import styles from "./styles.module.scss";

const { Content } = Layout;

const CURRENT_FUNDS = 500;

export function Payments() {
  const { token } = theme.useToken();

  const [payment, setPayment] = useState({} as PaymentType);

  const [contact, setContact] = useState({} as ContactType);
  const [mainAddress, setMainAddress] = useState({
    addresses: {
      1: "",
      2: "",
    },
  } as unknown as AddressType);
  const [card, setCard] = useState({} as CardType);
  const [billingAddress, setBillingAddress] = useState({
    addresses: {
      1: "",
      2: "",
    },
  } as unknown as AddressType);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "ach">("card");
  const [sameAddress, setSameAddress] = useState(false);

  const states = usaStates.map(state => ({
    label: state.name,
    value: state.name.toLowerCase(),
  }));

  async function handleSubmit() {
    const data = {
      payment,
      paymentMethod,
      contact,
      mainAddress,
      card,
      billingAddress,
    };

    try {
      if (Number(payment.amount) > CURRENT_FUNDS) {
        throw new Error("Insufficient Funds");
      }

      console.log({ data });
    } catch (error) {
      error instanceof Error && message.error(`Error: ${error.message}`);
    }
  }

  return (
    <Layout draggable={false} className={styles.layout}>
      <Header />

      <Layout hasSider className={styles.contentContainer}>
        <Sidebar />

        <Content className={styles.content}>
          {/* FIX BREADCRUMB SPACINGS */}
          <Breadcrumb
            items={[
              {
                title: (
                  <Typography.Link
                    href="/payments"
                    style={{ color: token.Breadcrumb?.itemColor }}
                  >
                    Payments
                  </Typography.Link>
                ),
              },
              {
                title: (
                  <Typography.Link
                    href="/create-payment"
                    style={{ color: token.Breadcrumb?.itemColor }}
                  >
                    Create a Payment
                  </Typography.Link>
                ),
              },
              {
                title: "Accept a Manual Payment",
              },
            ]}
            className={styles.breadcrumb}
          ></Breadcrumb>

          <Layout className={styles.rootFormContainer}>
            <Typography.Title
              className={styles.title}
              editable={false}
              level={2}
            >
              Accept a Manual Payment
            </Typography.Title>

            <Flex gap={24} className={styles.formContainer}>
              <Form
                layout="vertical"
                className={styles.basicForm}
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Form.Item htmlFor="amount" label="Amount">
                  <InputNumber
                    name="amount"
                    placeholder="00.00"
                    addonBefore={"$"}
                    value={payment.amount}
                    onChange={value =>
                      setPayment(prev => ({
                        ...prev,
                        amount: value,
                      }))
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item label="Fee mode">
                  <Flex
                    gap={16}
                    style={{ padding: "0.625rem 0", marginTop: "0.25rem" }}
                  >
                    <Checkbox
                      className={styles.checkbox}
                      checked={payment.feeMode === "merchant"}
                      onClick={() =>
                        setPayment(prev => ({ ...prev, feeMode: "merchant" }))
                      }
                    >
                      Merchant Pays Fee
                    </Checkbox>

                    <Checkbox
                      className={styles.checkbox}
                      checked={payment.feeMode === "payor"}
                      onClick={() =>
                        setPayment(prev => ({ ...prev, feeMode: "payor" }))
                      }
                    >
                      Payor Pays Fee
                    </Checkbox>
                  </Flex>
                </Form.Item>

                <Form.Item htmlFor="title" label="Payment Name">
                  <Input
                    name="title"
                    placeholder="Name of the item or service..."
                  />
                </Form.Item>

                <Form.Item htmlFor="description" label="Payment Description">
                  <Input.TextArea
                    rows={4}
                    name="description"
                    placeholder="Description of the item or service..."
                  />
                </Form.Item>

                <Form.Item
                  htmlFor="accountNumber"
                  required={false}
                  label="Account Number"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    name="accountNumber"
                    placeholder="A number that can be used to reference the payment"
                  />
                </Form.Item>
              </Form>

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
                    style={{
                      width: "100%",
                      boxShadow: "none",
                    }}
                  >
                    Card
                  </Button>

                  <Button
                    type={(paymentMethod === "ach" && "primary") || "text"}
                    onClick={() => setPaymentMethod("ach")}
                    style={{
                      width: "100%",
                      boxShadow: "none",
                    }}
                  >
                    ACH
                  </Button>
                </Flex>

                <Form className={styles.paymentMethodForm}>
                  {paymentMethod === "card" ? (
                    <Flex vertical gap={24}>
                      <Flex vertical gap={4}>
                        <Typography.Title level={5} className={styles.label}>
                          Contact Information
                        </Typography.Title>

                        <Flex vertical gap={8}>
                          <Flex gap={8}>
                            <Input
                              value={contact.name}
                              onChange={event =>
                                setContact(prev => ({
                                  ...prev,
                                  name: event.target.value,
                                }))
                              }
                              placeholder="First name"
                            />
                            <Input
                              value={contact.lastName}
                              onChange={event =>
                                setContact(prev => ({
                                  ...prev,
                                  lastName: event.target.value,
                                }))
                              }
                              placeholder="Last name"
                            />
                          </Flex>

                          <Input
                            value={contact.email}
                            onChange={event =>
                              setContact(prev => ({
                                ...prev,
                                email: event.target.value,
                              }))
                            }
                            placeholder="Email address"
                          />
                          <Input
                            value={contact.phone}
                            onChange={event =>
                              setContact(prev => ({
                                ...prev,
                                phone: event.target.value,
                              }))
                            }
                            placeholder="Phone number (optional)"
                          />
                        </Flex>
                      </Flex>

                      <Flex vertical gap={4}>
                        <Typography.Title level={5} className={styles.label}>
                          Home Address
                        </Typography.Title>

                        <Flex vertical gap={8}>
                          <Input
                            value={mainAddress.addresses["1"]}
                            onChange={event =>
                              setMainAddress(prev => ({
                                ...prev,
                                addresses: {
                                  ...prev.addresses,
                                  1: event.target.value,
                                },
                              }))
                            }
                            placeholder="Address line 1"
                          />
                          <Input
                            value={mainAddress.addresses["2"]}
                            onChange={event =>
                              setMainAddress(prev => ({
                                ...prev,
                                addresses: {
                                  ...prev.addresses,
                                  2: event.target.value,
                                },
                              }))
                            }
                            placeholder="Address line 2 (optional)"
                          />

                          <Flex gap={8}>
                            <Input
                              placeholder="City"
                              value={mainAddress.city}
                              onChange={event =>
                                setMainAddress(prev => ({
                                  ...prev,
                                  city: event.target.value,
                                }))
                              }
                              style={{ flex: 1 }}
                            />

                            <Select
                              placeholder="State"
                              options={states}
                              value={mainAddress.state}
                              onChange={value =>
                                setMainAddress(prev => ({
                                  ...prev,
                                  state: value,
                                }))
                              }
                              style={{ flex: 1 }}
                            />

                            <Input
                              placeholder="Zipcode"
                              value={mainAddress.zipcode}
                              onChange={event =>
                                setMainAddress(prev => ({
                                  ...prev,
                                  zipcode: event.target.value,
                                }))
                              }
                              style={{ flex: 1 }}
                            />
                          </Flex>
                        </Flex>
                      </Flex>

                      <Flex vertical gap={4}>
                        <Typography.Title level={5} className={styles.label}>
                          Card Information
                        </Typography.Title>

                        <Flex vertical gap={8}>
                          <Input
                            value={card.name}
                            onChange={event =>
                              setCard(prev => ({
                                ...prev,
                                name: event.target.value,
                              }))
                            }
                            placeholder="Name on card"
                          />

                          <Flex gap={8}>
                            <Input
                              value={card.number}
                              onChange={event =>
                                setCard(prev => ({
                                  ...prev,
                                  number: event.target.value,
                                }))
                              }
                              placeholder="Card number"
                            />
                            <Input
                              value={card.expirationDate}
                              onChange={event =>
                                setCard(prev => ({
                                  ...prev,
                                  expirationDate: event.target.value,
                                }))
                              }
                              placeholder="MM/YYYY"
                            />
                            <Input
                              value={card.zipcode}
                              onChange={event =>
                                setCard(prev => ({
                                  ...prev,
                                  zipcode: event.target.value,
                                }))
                              }
                              placeholder="Zipcode"
                            />
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
                            <Input
                              placeholder="Address line 1"
                              value={billingAddress.addresses["1"]}
                              onChange={event =>
                                setBillingAddress(prev => ({
                                  ...prev,
                                  addresses: {
                                    ...prev.addresses,
                                    1: event.target.value,
                                  },
                                }))
                              }
                            />
                            <Input
                              placeholder="Address line 2 (optional)"
                              value={billingAddress.addresses["2"]}
                              onChange={event =>
                                setBillingAddress(prev => ({
                                  ...prev,
                                  addresses: {
                                    ...prev.addresses,
                                    2: event.target.value,
                                  },
                                }))
                              }
                            />

                            <Flex gap={8}>
                              <Input
                                placeholder="City"
                                value={billingAddress.city}
                                onChange={event =>
                                  setBillingAddress(prev => ({
                                    ...prev,
                                    city: event.target.value,
                                  }))
                                }
                                style={{ flex: 1 }}
                              />

                              <Select
                                placeholder="State"
                                options={states}
                                value={billingAddress.state}
                                onChange={value =>
                                  setBillingAddress(prev => ({
                                    ...prev,
                                    state: value,
                                  }))
                                }
                                style={{ flex: 1 }}
                              />

                              <Input
                                placeholder="Zipcode"
                                value={billingAddress.zipcode}
                                onChange={event =>
                                  setBillingAddress(prev => ({
                                    ...prev,
                                    zipcode: event.target.value,
                                  }))
                                }
                                style={{ flex: 1 }}
                              />
                            </Flex>
                          </Flex>
                        )}
                      </Flex>

                      <Flex vertical gap={4}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={handleSubmit}
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
                    </Flex>
                  ) : (
                    "Coming soon!"
                  )}
                </Form>
              </Card>
            </Flex>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
