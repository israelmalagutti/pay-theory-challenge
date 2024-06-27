import { Breadcrumb } from "antd";

import styles from "./styles.module.scss";

const items = [
  {
    href: "/",
    title: "Payments",
  },
  {
    href: "/",
    title: "Create a Payment",
  },
  {
    title: "Accept a Manual Payment",
  },
].map((item, id) => ({ ...item, key: id }));

export function CustomBreadcrumb() {
  return (
    <Breadcrumb
      items={items}
      className={styles.breadcrumb}
      style={{
        display: "flex",
        width: "100%",
      }}
    />
  );
}
