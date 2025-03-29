import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "./auth";
import { toast } from "react-toastify";
import "./Login.css"; // Reuse the login styling
import AuthContext from "./AuthContext";

const Register = ({ setUser }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
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
			toast.success("Registration successful!");
			navigate("/");
		} catch (error) {
			console.error("Registration error:", error);
			if (error.errors) {
				setErrors(error.errors);
			} else {
				toast.error(error.message || "Registration failed. Please try again.");
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
							className={errors.name ? "error" : ""}
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
							className={errors.email ? "error" : ""}
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
							className={errors.password ? "error" : ""}
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
							className={errors.password_confirmation ? "error" : ""}
						/>
						{errors.password_confirmation && (
							<div className="error-message">
								{errors.password_confirmation}
							</div>
						)}
					</div>

					<button type="submit" className="login-button" disabled={loading}>
						{loading ? "Creating Account..." : "Create Account"}
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
