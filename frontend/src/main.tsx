import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from "@apollo/client";

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
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>{" "}
	</StrictMode>,
);
