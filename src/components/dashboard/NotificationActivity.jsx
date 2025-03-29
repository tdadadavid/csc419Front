import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import "./NotificationActivity.css";
import NotificationDetailModal from "./NotificationModal";

const NotificationActivity = ({ logs }) => {
	const [selectedNotification, setSelectedNotification] = useState(null);

	const handleNotificationClick = (log) => {
		setSelectedNotification(log);
	};

	const closeModal = () => {
		setSelectedNotification(null);
	};

	return (
		<div className="activity-logs">
			<div className="activity-header">
				<h2>Recent Notification Activity</h2>
				<Link to="/notifications/logs" className="view-all">
					View All
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="5" y1="12" x2="19" y2="12"></line>
						<polyline points="12 5 19 12 12 19"></polyline>
					</svg>
				</Link>
			</div>

			<div className="activity-content">
				<div className="activity-table-header">
					<div className="activity-cell">STAFF</div>
					<div className="activity-cell">TYPE</div>
					<div className="activity-cell">STATUS</div>
					<div className="activity-cell">MESSAGE</div>
					<div className="activity-cell">TIME</div>
				</div>

				{logs.length > 0 ? (
					<div className="activity-rows">
						{logs.map((log) => (
							<div
								key={log.id}
								className="activity-table-row"
								onClick={() => handleNotificationClick(log)}
							>
								<div className="activity-cell staff-name">
									{log.staff?.name || "Unknown"}
								</div>
								<div className="activity-cell">
									{log.type === "email" ? (
										<span className="type-badge email">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
												<polyline points="22,6 12,13 2,6"></polyline>
											</svg>
											email
										</span>
									) : (
										<span className="type-badge sms">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
											</svg>
											sms
										</span>
									)}
								</div>
								<div className="activity-cell">
									<span className={`status-badge ${log.status}`}>
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
									about{" "}
									{formatDistanceToNow(new Date(log.created_at), {
										addSuffix: false,
									})}{" "}
									ago
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="empty-state">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
							<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
						</svg>
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
