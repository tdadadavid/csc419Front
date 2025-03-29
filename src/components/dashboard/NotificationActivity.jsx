import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import "./DashboardCards.css";
import NotificationDetailModal from "./NotificationModal"; // We'll create this component

const NotificationActivity = ({ logs }) => {
	const [selectedNotification, setSelectedNotification] = useState(null);

	const getTypeIcon = (type) => {
		return type === "email" ? "fas fa-envelope" : "fas fa-sms";
	};

	const getTypeClass = (type) => {
		return type === "email" ? "email" : "sms";
	};

	const getStatusClass = (status) => {
		return status === "sent" ? "success" : "danger";
	};

	const handleNotificationClick = (log) => {
		setSelectedNotification(log);
	};

	const closeModal = () => {
		setSelectedNotification(null);
	};

	return (
		<div className="dashboard-card activity-logs">
			<div className="card-header">
				<h2>Recent Notification Activity</h2>
				<Link to="/notifications/logs" className="view-all">
					View All <i className="fas fa-arrow-right"></i>
				</Link>
			</div>

			<div className="card-content">
				{logs.length > 0 ? (
					<div className="activity-table">
						<div className="activity-table-header">
							<div className="activity-cell">Staff</div>
							<div className="activity-cell">Type</div>
							<div className="activity-cell">Status</div>
							<div className="activity-cell">Message</div>
							<div className="activity-cell">Time</div>
						</div>

						{logs.map((log) => (
							<div
								key={log.id}
								className="activity-table-row notification-row"
								onClick={() => handleNotificationClick(log)}
							>
								<div className="activity-cell staff-name">{log.staff.name}</div>
								<div className="activity-cell">
									<span className={`badge ${getTypeClass(log.type)}`}>
										<i className={getTypeIcon(log.type)}></i> {log.type}
									</span>
								</div>
								<div className="activity-cell">
									<span className={`badge ${getStatusClass(log.status)}`}>
										{log.status}
									</span>
								</div>
								<div className="activity-cell message">
									{log.message
										? log.message.substring(0, 30) +
										  (log.message.length > 30 ? "..." : "")
										: "N/A"}
								</div>
								<div
									className="activity-cell time"
									title={format(new Date(log.created_at), "PPpp")}
								>
									{formatDistanceToNow(new Date(log.created_at), {
										addSuffix: true,
									})}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="empty-state">
						<i className="far fa-bell-slash"></i>
						<p>No recent notification activity</p>
					</div>
				)}
			</div>

			{/* Notification Detail Modal */}
			{selectedNotification && (
				<NotificationDetailModal
					notification={selectedNotification}
					onClose={closeModal}
				/>
			)}
		</div>
	);
};

export default NotificationActivity;
