import { Card, Flex, Result, Typography } from "antd";

import styles from "./styles.module.scss";

const { Title } = Typography;

export function Account() {
  return (
    <Flex vertical className={styles.container}>
      <Title className={styles.title} editable={false} level={2}>
        Account
      </Title>

      <Card className={styles.card}>
        <Result
          status="info"
          title="Coming soon!"
          subTitle="A portal to manage your account."
        />
      </Card>
    </Flex>
  );
}
