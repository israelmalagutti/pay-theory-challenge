import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { CustomBreadcrumb } from "../CustomBreadcrumb";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

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
          <CustomBreadcrumb />

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
