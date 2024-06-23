import { ConfigProvider } from "antd";

import lightTheme from "@/themes/light.json";

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
      Hello world!
    </ConfigProvider>
  );
}

export default App;
