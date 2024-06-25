import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { Breadcrumb, Layout } from "antd";

import styles from "./styles.module.scss";

const { Content } = Layout;

export function CustomLayout() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout draggable={false} className={styles.layout}>
      <Header />

      <Layout
        hasSider
        className={styles.contentContainer}
        style={{
          maxHeight: windowHeight - 48,
        }}
      >
        <Sidebar />

        <Content className={styles.content}>
          <Breadcrumb
            items={[
              {
                href: "/payments",
                title: "Payments",
              },
              {
                href: "/create-payment",
                title: "Create a Payment",
              },
              {
                href: "/",
                title: "Accept a Manual Payment",
              },
            ]}
            className={styles.breadcrumb}
            style={{
              display: "flex",
              alignItems: "center",
              height: "fit-content",
              width: "100%",
            }}
          ></Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
