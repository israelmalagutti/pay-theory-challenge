import { Flex, Form, FormInstance, Input, Typography } from "antd";

import { CreditCardOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

type Props = { form: FormInstance };

const { Title } = Typography;

export function CardInformationForm({ form }: Props) {
  return (
    <Flex vertical gap={4}>
      <Title level={5} className={styles.title}>
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
            onChange={event => form.setFieldValue("name", event.target.value)}
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
              onChange={event => form.setFieldValue("cvv", event.target.value)}
            />
          </Form.Item>
        </Flex>
      </Flex>
    </Flex>
  );
}
