import { Button, Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { PlusCircleOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

const { Sider } = Layout;

const sidebarItems: ItemType<MenuItemType>[] | undefined = [
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
  return (
    <Sider width={168} className={styles.sidebar}>
      <div className={styles.buttonContainer}>
        <Button
          icon={<PlusCircleOutlined size={16} />}
          className={styles.button}
          style={{ boxShadow: "none" }}
        >
          Create a Payment
        </Button>
      </div>

      <Menu
        defaultSelectedKeys={["1"]}
        className={styles.menu}
        mode="vertical"
        items={sidebarItems}
      />
    </Sider>
  );
}
