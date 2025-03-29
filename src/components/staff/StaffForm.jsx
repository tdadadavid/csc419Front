import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { toast } from "react-toastify";
import "./StaffForm.css";

const StaffForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const isEditing = !!id;

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		department: "",
		date_of_birth: "",
		custom_message: "",
	});

	const [departments, setDepartments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(isEditing);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		// Fetch departments list
		const fetchDepartments = async () => {
			try {
				const response = await api.get("/staff/create");
				setDepartments(response.data.departments);
			} catch (error) {
				console.error("Error fetching departments:", error);
				toast.error("Failed to load departments");
			}
		};

		// Fetch staff data for editing
		const fetchStaffData = async () => {
			try {
				setInitialLoading(true);
				const response = await api.get(`/staff/${id}/edit`);

				// Format date for input field (YYYY-MM-DD)
				const staffData = response.data.staff;
				const formattedDate = new Date(staffData.date_of_birth)
					.toISOString()
					.split("T")[0];

				setFormData({
					...staffData,
					date_of_birth: formattedDate,
				});

				setDepartments(response.data.departments);
			} catch (error) {
				console.error("Error fetching staff data:", error);
				toast.error("Failed to load staff data");
				navigate("/staff");
			} finally {
				setInitialLoading(false);
			}
		};

		fetchDepartments();

		if (isEditing) {
			fetchStaffData();
		}
	}, [id, isEditing, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error on change
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.department) {
			newErrors.department = "Department is required";
		}

		if (!formData.date_of_birth) {
			newErrors.date_of_birth = "Date of birth is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);

		try {
			if (isEditing) {
				await api.put(`/staff/${id}`, formData);
				toast.success("Staff updated successfully");
			} else {
				await api.post("/staff", formData);
				toast.success("Staff added successfully");
			}

			navigate("/staff");
		} catch (error) {
			console.error("Error saving staff:", error);

			if (error.response?.data?.errors) {
				// Handle validation errors from Laravel
				setErrors(error.response.data.errors);
			} else {
				toast.error(
					error.response?.data?.message || "An error occurred while saving"
				);
			}
		} finally {
			setLoading(false);
		}
	};

	if (initialLoading) {
		return (
			<div className="staff-form-loading">
				<div className="loading-spinner"></div>
				<p>Loading staff data...</p>
			</div>
		);
	}

	return (
		<div className="staff-form-container">
			<div className="staff-form-header">
				<h1>{isEditing ? "Edit Staff" : "Add New Staff"}</h1>
			</div>

			<form onSubmit={handleSubmit} className="staff-form">
				<div className="form-group">
					<label htmlFor="name">
						Full Name <span className="required">*</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={`form-control ${errors.name ? "error" : ""}`}
					/>
					{errors.name && <div className="error-message">{errors.name}</div>}
				</div>

				<div className="form-group">
					<label htmlFor="email">
						Email Address <span className="required">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`form-control ${errors.email ? "error" : ""}`}
					/>
					{errors.email && <div className="error-message">{errors.email}</div>}
				</div>

				<div className="form-group">
					<label htmlFor="phone">Phone Number</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className={`form-control ${errors.phone ? "error" : ""}`}
						placeholder="e.g. 08012345678"
					/>
					{errors.phone && <div className="error-message">{errors.phone}</div>}
				</div>

				<div className="form-group">
					<label htmlFor="department">
						Department <span className="required">*</span>
					</label>
					<select
						id="department"
						name="department"
						value={formData.department}
						onChange={handleChange}
						className={`form-control ${errors.department ? "error" : ""}`}
					>
						<option value="">Select Department</option>
						{departments.map((department) => (
							<option key={department} value={department}>
								{department}
							</option>
						))}
					</select>
					{errors.department && (
						<div className="error-message">{errors.department}</div>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="date_of_birth">
						Date of Birth <span className="required">*</span>
					</label>
					<input
						type="date"
						id="date_of_birth"
						name="date_of_birth"
						value={formData.date_of_birth}
						onChange={handleChange}
						className={`form-control ${errors.date_of_birth ? "error" : ""}`}
					/>
					{errors.date_of_birth && (
						<div className="error-message">{errors.date_of_birth}</div>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="custom_message">Custom Birthday Message</label>
					<textarea
						id="custom_message"
						name="custom_message"
						value={formData.custom_message}
						onChange={handleChange}
						className={`form-control ${errors.custom_message ? "error" : ""}`}
						rows="4"
						placeholder="Enter a personalized birthday message for this staff member..."
					></textarea>
					{errors.custom_message && (
						<div className="error-message">{errors.custom_message}</div>
					)}
				</div>

				<div className="form-actions">
					<button
						type="button"
						onClick={() => navigate("/staff")}
						className="cancel-button"
						disabled={loading}
					>
						Cancel
					</button>
					<button type="submit" className="save-button" disabled={loading}>
						{loading ? (
							<>
								<div className="button-spinner"></div>
								{isEditing ? "Updating..." : "Saving..."}
							</>
						) : isEditing ? (
							"Update Staff"
						) : (
							"Add Staff"
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default StaffForm;
