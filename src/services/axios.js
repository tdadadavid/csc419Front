// src/services/api.js
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true, // Important for cookies/session
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Intercept requests to add CSRF token when it's available
api.interceptors.request.use(function (config) {
	// Try to get the CSRF token from the cookie
	const token = getCookie("XSRF-TOKEN");
	if (token) {
		config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
	}
	return config;
});

// Helper function to get cookies
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

export default api;
