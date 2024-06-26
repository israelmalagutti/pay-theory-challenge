import { Button, Layout, Menu } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const sidebarItems = [
  {
    label: "Dashboard",
  },

  {
    label: "Payments",
  },

  {
    label: "Account",
  },

  {
    label: "Developers",
  },
].map((item, id) => ({
  ...item,
  key: id,
  className: styles.menuItem,
}));

export function Sidebar() {
  const navigate = useNavigate();

  function handleNavigation({ key }: { key: string }) {
    const routeKey = Number(key);

    const route = `${sidebarItems[routeKey]?.label.toLowerCase()}`;

    navigate(route);
  }

  return (
    <Sider width={168} className={styles.sidebar}>
      <div className={styles.buttonContainer}>
        <Button
          icon={<PlusCircleOutlined size={16} />}
          className={styles.button}
          style={{ boxShadow: "none" }}
          onClick={() => navigate("/payments")}
        >
          Create a Payment
        </Button>
      </div>

      <Menu
        defaultSelectedKeys={["1"]}
        onSelect={handleNavigation}
        className={styles.menu}
        mode="vertical"
        items={sidebarItems}
      />
    </Sider>
  );
}
