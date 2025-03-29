import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "./StaffList.css";

const StaffList = () => {
	const [staff, setStaff] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [departmentFilter, setDepartmentFilter] = useState("all");
	const [monthFilter, setMonthFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [confirmDelete, setConfirmDelete] = useState(null);

	const navigate = useNavigate();

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	useEffect(() => {
		fetchStaff();
	}, [currentPage, departmentFilter, monthFilter]);

	const fetchStaff = async () => {
		try {
			setLoading(true);
			const response = await api.get("/staff", {
				params: {
					search: searchTerm,
					department: departmentFilter,
					month: monthFilter,
					page: currentPage,
				},
			});

      console.log(response)
			setStaff(response.data.staff.data);
			setDepartments(response.data.departments);
			setTotalPages(
				Math.ceil(response.data.staff.total / response.data.staff.per_page)
			);
			setError("");
		} catch (err) {
			console.error("Error fetching staff:", err);
			setError("Failed to load staff data. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setCurrentPage(1);
		fetchStaff();
	};

	const handleSearchReset = () => {
		setSearchTerm("");
		setDepartmentFilter("all");
		setMonthFilter("all");
		setCurrentPage(1);
		fetchStaff();
	};

	const handleDeleteStaff = async (id) => {
		try {
			await api.delete(`/staff/${id}`);
			setStaff(staff.filter((person) => person.id !== id));
			toast.success("Staff member deleted successfully");
			setConfirmDelete(null);
		} catch (error) {
			console.error("Error deleting staff:", error);
			toast.error("Failed to delete staff member");
		}
	};

	return (
		<div className="staff-list-container">
			<div className="staff-list-header">
				<h1>Staff Management</h1>
				<Link to="/staff/add" className="add-staff-button">
					<i className="fas fa-plus"></i> Add Staff
				</Link>
			</div>

			<div className="filter-section">
				<form onSubmit={handleSearch} className="search-form">
					<div className="search-input-container">
						<input
							type="text"
							placeholder="Search staff..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="search-input"
						/>
						<button type="submit" className="search-button">
							<i className="fas fa-search"></i>
						</button>
					</div>

					<div className="filter-group">
						<select
							value={departmentFilter}
							onChange={(e) => setDepartmentFilter(e.target.value)}
							className="filter-select"
						>
							<option value="all">All Departments</option>
							{departments.map((department) => (
								<option key={department} value={department}>
									{department}
								</option>
							))}
						</select>

						<select
							value={monthFilter}
							onChange={(e) => setMonthFilter(e.target.value)}
							className="filter-select"
						>
							<option value="all">All Months</option>
							{months.map((month, index) => (
								<option key={month} value={index + 1}>
									{month}
								</option>
							))}
						</select>

						<button
							type="button"
							onClick={handleSearchReset}
							className="reset-button"
						>
							<i className="fas fa-redo-alt"></i> Reset
						</button>
					</div>
				</form>
			</div>

			{error ? (
				<div className="staff-error">
					<i className="fas fa-exclamation-circle"></i>
					<p>{error}</p>
					<button onClick={fetchStaff}>Retry</button>
				</div>
			) : (
				<>
					<div className="staff-table-container">
						<table className="staff-table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Department</th>
									<th>Date of Birth</th>
									<th>Contact</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td colSpan="5" className="loading-cell">
											<div className="loading-spinner"></div>
											<p>Loading...</p>
										</td>
									</tr>
								) : staff.length === 0 ? (
									<tr>
										<td colSpan="5" className="empty-cell">
											<div className="empty-state">
												<i className="fas fa-users-slash"></i>
												<p>No staff members found</p>
											</div>
										</td>
									</tr>
								) : (
									staff.map((person) => (
										<tr key={person.id}>
											<td>{person.name}</td>
											<td>{person.department}</td>
											<td>
												{format(new Date(person.date_of_birth), "MMMM d, yyyy")}
											</td>
											<td>
												<div className="contact-info">
													<div className="email">{person.email}</div>
													<div className="phone">
														{person.phone || "No phone"}
													</div>
												</div>
											</td>
											<td>
												<div className="action-buttons">
													<button
														onClick={() => navigate(`/staff/edit/${person.id}`)}
														className="edit-button"
														title="Edit"
													>
														<i className="fas fa-edit"></i>
													</button>

													<button
														onClick={() => setConfirmDelete(person.id)}
														className="delete-button"
														title="Delete"
													>
														<i className="fas fa-trash-alt"></i>
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{totalPages > 1 && (
						<div className="pagination">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className="pagination-button"
							>
								<i className="fas fa-chevron-left"></i> Previous
							</button>

							<div className="pagination-info">
								Page {currentPage} of {totalPages}
							</div>

							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, totalPages))
								}
								disabled={currentPage === totalPages}
								className="pagination-button"
							>
								Next <i className="fas fa-chevron-right"></i>
							</button>
						</div>
					)}
				</>
			)}

			{confirmDelete && (
				<div className="delete-confirmation-modal">
					<div className="modal-content">
						<h3>Confirm Delete</h3>
						<p>
							Are you sure you want to delete this staff member? This action
							cannot be undone.
						</p>
						<div className="modal-actions">
							<button
								onClick={() => setConfirmDelete(null)}
								className="cancel-button"
							>
								Cancel
							</button>
							<button
								onClick={() => handleDeleteStaff(confirmDelete)}
								className="confirm-button"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StaffList;
