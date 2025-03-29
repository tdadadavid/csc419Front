import React from "react";
import { format } from "date-fns";
import "./NotificationModal.css";

const NotificationDetailModal = ({ notification, onClose }) => {
	const getTypeIcon = (type) => {
		return type === "email" ? "fas fa-envelope" : "fas fa-sms";
	};

	const getTypeClass = (type) => {
		return type === "email" ? "email" : "sms";
	};

	const getStatusClass = (status) => {
		return status === "sent" ? "success" : "danger";
	};

	const handleRetry = () => {
		// Implement retry functionality here
		console.log(
			`Retrying ${notification.type} notification for ${notification.staff.name}`
		);
	};

	return (
		<div className="notification-modal-backdrop" onClick={onClose}>
			<div
				className="notification-modal-content"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="notification-modal-header">
					<h2>Notification Details</h2>
					<button className="close-button" onClick={onClose}>
						<i className="fas fa-times"></i>
					</button>
				</div>

				<div className="notification-modal-body">
					<div className="detail-item">
						<div className="detail-label">Staff</div>
						<div className="detail-value">{notification.staff.name}</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">Department</div>
						<div className="detail-value">{notification.staff.department}</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">Type</div>
						<div className="detail-value">
							<span className={`badge ${getTypeClass(notification.type)}`}>
								<i className={getTypeIcon(notification.type)}></i>{" "}
								{notification.type}
							</span>
						</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">Status</div>
						<div className="detail-value">
							<span className={`badge ${getStatusClass(notification.status)}`}>
								{notification.status}
							</span>
						</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">Date/Time</div>
						<div className="message-content">
							{format(new Date(notification.created_at), "PPP, h:mm:ss a")}
						</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">Message</div>
						<div className="detail-value">
							{notification.message && (
								<div className="message-content">{notification.message}</div>
							)}
						</div>
					</div>

					{notification.error && (
						<div className="detail-item">
							<div className="detail-label">Error</div>
							<div className="detail-value">
								<div className="error-content">{notification.error}</div>
							</div>
						</div>
					)}
				</div>

				<div className="notification-modal-footer">
					<button className="btn btn-secondary" onClick={onClose}>
						Close
					</button>
					{notification.status === "failed" && (
						<button className="btn btn-primary" onClick={handleRetry}>
							<i className="fas fa-redo"></i> Retry{" "}
							{notification.type === "email" ? "Email" : "SMS"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationDetailModal;
