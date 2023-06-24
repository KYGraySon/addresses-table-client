import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Address from "./pages/Address.jsx";
import UserPage from "./pages/UserPage.jsx";
import History from "./pages/History.jsx";
import AnalyticsContextProvider from "./context/AnalyticsContext.jsx";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, bsc],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/history/:id",
    element: <History />,
  },
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/address/:userId",
    element: <UserPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AnalyticsContextProvider>
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>
  </AnalyticsContextProvider>
);
