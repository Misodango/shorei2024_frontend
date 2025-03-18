import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css"; // これが重要

import "./index.css";
import App from "./App";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

// Mantineのテーマを設定（オプション）
const theme = createTheme({
  primaryColor: 'blue',
  // 他の設定をここに追加
});

const root = createRoot(document.getElementById("root") as Element);
const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

root.render(
  <StrictMode>
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </MantineProvider>
  </StrictMode>
);
