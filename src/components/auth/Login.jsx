import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { AuthService } from "./auth";
import AuthContext from "./AuthContext"

const Login = ({ setUser }) => {
    const { login } = useContext(AuthContext);
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		remember: false,
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

  const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setCredentials({
			...credentials,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

    try {

      const response = await AuthService.login(credentials)

      console.log(response)

      setUser(response.user);
      login(response.user)
			navigate("/");
		} catch (error) {
			console.error("Login error:", error);
			setError(
				error.response?.data?.message ||
					"An error occurred during login. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<div className="login-header">
					<h1>Birthday Reminder System</h1>
					<h2>Faculty of Science, UNILAG</h2>
				</div>

				{error && <div className="error-message">{error}</div>}

				<form onSubmit={handleSubmit} className="login-form">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={credentials.email}
							onChange={handleChange}
							required
							placeholder="Enter your email"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
							required
							placeholder="Enter your password"
						/>
					</div>

					<div className="form-group-checkbox">
						<input
							type="checkbox"
							id="remember"
							name="remember"
							checked={credentials.remember}
							onChange={handleChange}
						/>
						<label htmlFor="remember">Remember me</label>
					</div>

					<button type="submit" className="login-button" disabled={loading}>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				<div className="auth-links">
					Don't have an account? <Link to="/register">Create Account</Link>
				</div>
			</div>

			<footer className="login-footer">
				&copy; {new Date().getFullYear()} Faculty of Science, University of
				Lagos
			</footer>
		</div>
	);
};

export default Login;
