import { ConfigProvider } from "antd";

import lightTheme from "@/themes/light.json";

import { Payments } from "./pages/Payments";

function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        token: lightTheme.token,
        components: lightTheme.components,
      }}
    >
      <Payments />
    </ConfigProvider>
  );
}

export default App;
