import { Dispatch, SetStateAction } from "react";

import {
  Checkbox,
  Flex,
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
} from "antd";

import styles from "./styles.module.scss";

type BillingAddressFormProps = {
  form: FormInstance;
  states: { label: string; value: string }[];

  sameAddress: boolean;
  setSameAddress: Dispatch<SetStateAction<boolean>>;
};

const { Title } = Typography;

export function BillingAddressForm({
  form,
  states,

  sameAddress,
  setSameAddress,
}: BillingAddressFormProps) {
  return (
    <Flex vertical gap={4}>
      <Title level={5} className={styles.title}>
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
  );
}
