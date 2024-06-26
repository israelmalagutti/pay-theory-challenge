import { Card, Flex, Result, Typography } from "antd";

import styles from "./styles.module.scss";

const { Title } = Typography;

export function PaymentFeedback() {
  return (
    <Flex vertical className={styles.container}>
      <Title className={styles.title} editable={false} level={2}>
        Accept a Manual Payment
      </Title>

      <Card className={styles.card}>
        <Result
          status="success"
          title="Payment has been submitted."
          subTitle="A copy of the receipt has been sent to the payor."
          className={styles.result}
        />
      </Card>
    </Flex>
  );
}
