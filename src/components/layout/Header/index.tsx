import { Layout } from "antd";

import styles from "./styles.module.scss";

import Logo from "@/assets/logo.svg";

export function Header() {
  return (
    <Layout.Header className={styles.header}>
      <img src={Logo} alt="Logo icon" />
    </Layout.Header>
  );
}
