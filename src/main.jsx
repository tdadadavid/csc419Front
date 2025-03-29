import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import "./components/auth/Login.css";
import "./components/auth/dark-input-fix.css";
import App from "./App.jsx";

// Force dark theme on for testing
document.documentElement.classList.add("dark-theme");
document.body.classList.add("dark-mode");

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
