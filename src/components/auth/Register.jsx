import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "./auth";
import "./Login.css";
import AuthContext from "./AuthContext";

const Register = ({ setUser }) => {
	const { login } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Clear error when field is edited
		if (errors[name]) {
			setErrors({ ...errors, [name]: null });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		try {
			const response = await AuthService.register(formData);
			setUser(response.user);
			login(response.user);
			navigate("/");
		} catch (error) {
			console.error("Registration error:", error);
			if (error.errors) {
				setErrors(error.errors);
			} else {
				// Show error message
				setErrors({
					general: error.message || "Registration failed. Please try again.",
				});
			}
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
					<h3>Create an Account</h3>
				</div>

				{errors.general && (
					<div className="error-message">{errors.general}</div>
				)}

				<form onSubmit={handleSubmit} className="login-form">
					<div className="form-group">
						<label htmlFor="name">Full Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							placeholder="Enter your full name"
							className={`form-control ${errors.name ? "error" : ""}`}
						/>
						{errors.name && <div className="error-message">{errors.name}</div>}
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							placeholder="Enter your email"
							className={`form-control ${errors.email ? "error" : ""}`}
						/>
						{errors.email && (
							<div className="error-message">{errors.email}</div>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							placeholder="Enter your password"
							className={`form-control ${errors.password ? "error" : ""}`}
						/>
						{errors.password && (
							<div className="error-message">{errors.password}</div>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="password_confirmation">Confirm Password</label>
						<input
							type="password"
							id="password_confirmation"
							name="password_confirmation"
							value={formData.password_confirmation}
							onChange={handleChange}
							required
							placeholder="Confirm your password"
							className={`form-control ${
								errors.password_confirmation ? "error" : ""
							}`}
						/>
						{errors.password_confirmation && (
							<div className="error-message">
								{errors.password_confirmation}
							</div>
						)}
					</div>

					<button type="submit" className="login-button" disabled={loading}>
						{loading ? (
							<>
								<div className="button-spinner"></div> Creating Account...
							</>
						) : (
							"Create Account"
						)}
					</button>
				</form>

				<div className="auth-links">
					Already have an account? <Link to="/login">Sign In</Link>
				</div>
			</div>

			<footer className="login-footer">
				&copy; {new Date().getFullYear()} Faculty of Science, University of
				Lagos
			</footer>
		</div>
	);
};

export default Register;
