import { Flex, Form, FormInstance, Input, Select, Typography } from "antd";

import styles from "./styles.module.scss";

type HomeAddressFormProps = {
  form: FormInstance;
  states: { label: string; value: string }[];
};

const { Title } = Typography;

export function HomeAddressForm({ form, states }: HomeAddressFormProps) {
  return (
    <Flex vertical gap={4}>
      <Title level={5} className={styles.title}>
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
            onChange={event => form.setFieldValue("line1", event.target.value)}
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
            onChange={event => form.setFieldValue("line2", event.target.value)}
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
              onChange={event => form.setFieldValue("city", event.target.value)}
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
  );
}
