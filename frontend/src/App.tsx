import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ApolloClient, InmemoryCache, gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
