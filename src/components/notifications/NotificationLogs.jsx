import React, { useState, useEffect } from "react";
import api from "../../services/axios";
import { format, formatDistanceToNow } from "date-fns";
import "./NotificationLogs.css";

const NotificationLogs = () => {
	const [logs, setLogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filters, setFilters] = useState({
		type: "all",
		status: "all",
		staff_id: "",
	});

	useEffect(() => {
		fetchLogs();
	}, [currentPage, filters]);

	const fetchLogs = async () => {
		try {
			setLoading(true);
			const params = {
				page: currentPage,
				...filters,
			};

			// Remove empty or 'all' filters
			Object.keys(params).forEach(
				(key) =>
					(params[key] === "" || params[key] === "all") && delete params[key]
			);

			const response = await api.get("/notifications/logs", { params });

			setLogs(response.data.data);
			setTotalPages(Math.ceil(response.data.total / response.data.per_page));
			setError("");
		} catch (err) {
			console.error("Error fetching notification logs:", err);
			setError("Failed to load notification logs. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: value,
		}));
		setCurrentPage(1); // Reset to first page when filter changes
	};

	const resetFilters = () => {
		setFilters({
			type: "all",
			status: "all",
			staff_id: "",
		});
		setCurrentPage(1);
	};

	const getTypeIcon = (type) => {
		return type === "email" ? "fas fa-envelope" : "fas fa-sms";
	};

	const getTypeClass = (type) => {
		return type === "email" ? "email" : "sms";
	};

	const getStatusClass = (status) => {
		return status === "sent" ? "success" : "danger";
	};

	return (
		<div className="notification-logs-container">
			<div className="notification-logs-header">
				<h1>Notification Logs</h1>
				<p>History of all notification activities</p>
			</div>

			<div className="logs-filter-section">
				<div className="filter-controls">
					<div className="filter-item">
						<label>Type</label>
						<select
							name="type"
							value={filters.type}
							onChange={handleFilterChange}
							className="filter-select"
						>
							<option value="all">All Types</option>
							<option value="email">Email</option>
							<option value="sms">SMS</option>
						</select>
					</div>

					<div className="filter-item">
						<label>Status</label>
						<select
							name="status"
							value={filters.status}
							onChange={handleFilterChange}
							className="filter-select"
						>
							<option value="all">All Statuses</option>
							<option value="sent">Sent</option>
							<option value="failed">Failed</option>
						</select>
					</div>

					<div className="filter-item">
						<label>Staff ID</label>
						<input
							type="text"
							name="staff_id"
							value={filters.staff_id}
							onChange={handleFilterChange}
							placeholder="Enter Staff ID"
							className="filter-input"
						/>
					</div>

					<button onClick={resetFilters} className="reset-filters">
						<i className="fas fa-redo-alt"></i> Reset
					</button>
				</div>
			</div>

			{error ? (
				<div className="logs-error">
					<i className="fas fa-exclamation-circle"></i>
					<p>{error}</p>
					<button onClick={fetchLogs}>Retry</button>
				</div>
			) : (
				<>
					<div className="logs-table-container">
						<table className="logs-table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Staff</th>
									<th>Type</th>
									<th>Status</th>
									<th>Message</th>
									<th>Error</th>
									<th>Date/Time</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td colSpan="7" className="loading-cell">
											<div className="loading-spinner"></div>
											<p>Loading logs...</p>
										</td>
									</tr>
								) : logs.length === 0 ? (
									<tr>
										<td colSpan="7" className="empty-cell">
											<div className="empty-state">
												<i className="fas fa-bell-slash"></i>
												<p>No notification logs found</p>
											</div>
										</td>
									</tr>
								) : (
									logs.map((log) => (
										<tr key={log.id}>
											<td>{log.id}</td>
											<td>{log.staff?.name || "Unknown"}</td>
											<td>
												<span className={`badge ${getTypeClass(log.type)}`}>
													<i className={getTypeIcon(log.type)}></i> {log.type}
												</span>
											</td>
											<td>
												<span className={`badge ${getStatusClass(log.status)}`}>
													{log.status}
												</span>
											</td>
											<td>
												<div className="message-cell" title={log.message}>
													{log.message
														? log.message.substring(0, 50) +
														  (log.message.length > 50 ? "..." : "")
														: "N/A"}
												</div>
											</td>
											<td>
												{log.error ? (
													<div className="error-cell" title={log.error}>
														{log.error.substring(0, 30) +
															(log.error.length > 30 ? "..." : "")}
													</div>
												) : (
													<span className="no-error">No error</span>
												)}
											</td>
											<td>
												<div
													className="time-cell"
													title={format(new Date(log.created_at), "PPpp")}
												>
													{formatDistanceToNow(new Date(log.created_at), {
														addSuffix: true,
													})}
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
		</div>
	);
};

export default NotificationLogs;
