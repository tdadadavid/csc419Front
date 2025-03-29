// src/App.js
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import api from "./services/axios";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Calendar from "./components/calendar/Calendar";
import StaffList from "./components/staff/StaffList";
import StaffForm from "./components/staff/StaffForm";
import NotificationSettings from "./components/notifications/NotificationSettings";
import NotificationLogs from "./components/notifications/NotificationLogs";
import Layout from "./components/layout/Layout";
import "./App.css";
import { AuthProvider } from "./components/auth/AuthContext";

export const App = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(true); // Default to dark mode

	// Check if user is authenticated
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await api.get("/user");
				setUser(response.data.user);
			} catch (error) {
				console.error("Not authenticated", error);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();

		// Check for dark mode preference - default to true if not set
		const savedDarkMode = localStorage.getItem("darkMode");
		setDarkMode(savedDarkMode !== null ? savedDarkMode === "true" : true);
	}, []);

	// Toggle dark mode
	const toggleDarkMode = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);
		localStorage.setItem("darkMode", newDarkMode.toString());

		// Apply dark mode to body
		if (newDarkMode) {
			document.body.classList.add("dark-mode");
			document.documentElement.classList.add("dark-theme");
		} else {
			document.body.classList.remove("dark-mode");
			document.documentElement.classList.remove("dark-theme");
		}
	};

	// Apply dark mode on initial load
	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark-mode");
			document.documentElement.classList.add("dark-theme");
		} else {
			document.body.classList.remove("dark-mode");
			document.documentElement.classList.remove("dark-theme");
		}
	}, [darkMode]);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<AuthProvider>
			<Router>
				<div className={`app ${darkMode ? "dark-theme" : "light-theme"}`}>
					<Routes>
						<Route
							path="/login"
							element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
						/>
						<Route
							path="/register"
							element={
								user ? <Navigate to="/" /> : <Register setUser={setUser} />
							}
						/>
						<Route
							path="/"
							element={
								user ? (
									<Layout
										user={user}
										setUser={setUser}
										darkMode={darkMode}
										toggleDarkMode={toggleDarkMode}
									>
										<Dashboard />
									</Layout>
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/calendar"
							element={
								user ? (
									<Layout
										user={user}
										setUser={setUser}
										darkMode={darkMode}
										toggleDarkMode={toggleDarkMode}
									>
										<Calendar />
									</Layout>
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/staff"
							element={
								user ? (
									<Layout
										user={user}
										setUser={setUser}
										darkMode={darkMode}
										toggleDarkMode={toggleDarkMode}
									>
										<StaffList />
									</Layout>
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/staff/add"
							element={
								user ? (
									<Layout
										user={user}
										setUser={setUser}
										darkMode={darkMode}
										toggleDarkMode={toggleDarkMode}
									>
										<StaffForm />
									</Layout>
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/staff/edit/:id"
							element={
								user ? (
									<Layout
										user={user}
										setUser={setUser}
										darkMode={darkMode}
										toggleDarkMode={toggleDarkMode}
									>
										<StaffForm />
									</Layout>
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/notifications/settings"
							element={
								user ? (
									<Layout
										user={user}
										setUser={setUser}
										darkMode={darkMode}
										toggleDarkMode={toggleDarkMode}
									>
										<NotificationSettings />
									</Layout>
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/notifications/logs"
							element={
								user ? (
									<Layout
										user={user}
										setUser={setUser}
										darkMode={darkMode}
										toggleDarkMode={toggleDarkMode}
									>
										<NotificationLogs />
									</Layout>
								) : (
									<Navigate to="/login" />
								)
							}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App