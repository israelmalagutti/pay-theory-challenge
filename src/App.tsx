import { ConfigProvider } from "antd";

import lightTheme from "@/themes/light.json";

import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

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
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
