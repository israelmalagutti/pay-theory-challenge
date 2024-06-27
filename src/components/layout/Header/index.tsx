import { Link } from "react-router-dom";

import { Layout } from "antd";

import styles from "./styles.module.scss";

import Logo from "@/assets/logo.svg";

export function Header() {
  return (
    <Layout.Header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Logo icon" />
      </Link>
    </Layout.Header>
  );
}
