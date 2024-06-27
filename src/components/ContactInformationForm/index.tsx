import { Flex, Form, FormInstance, Input, Typography } from "antd";

import styles from "./styles.module.scss";

type ContactInformationFormProps = { form: FormInstance };

const { Title } = Typography;

export function ContactInformationForm({ form }: ContactInformationFormProps) {
  return (
    <Flex vertical gap={4}>
      <Title level={5} className={styles.label}>
        Contact Information
      </Title>

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
              placeholder="First name"
              value={form.getFieldValue("firstName")}
              onChange={event =>
                form.setFieldValue("firstName", event.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            noStyle
            name={["contact", "lastName"]}
            rules={[{ required: true }]}
          >
            <Input
              autoCapitalize="words"
              placeholder="Last name"
              value={form.getFieldValue("lastName")}
              onChange={event =>
                form.setFieldValue("lastName", event.target.value)
              }
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
            onChange={event => form.setFieldValue("email", event.target.value)}
          />
        </Form.Item>

        <Form.Item hasFeedback noStyle name={["contact", "phone"]}>
          <Input
            placeholder="Phone number (optional)"
            value={form.getFieldValue("phone")}
            onChange={event => form.setFieldValue("phone", event.target.value)}
          />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
