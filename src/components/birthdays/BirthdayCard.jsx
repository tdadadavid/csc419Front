import React from "react";
import "./BirthdayCard.css";

const BirthdayCard = ({ staff, isTodayBirthday, onClick }) => {
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	const sendEmail = (e) => {
		e.stopPropagation();
		// Implement email sending logic
		console.log(`Sending email to ${staff.email}`);
	};

	const sendSMS = (e) => {
		e.stopPropagation();
		// Implement SMS sending logic
		console.log(`Sending SMS to ${staff.phone}`);
	};

	return (
		<div className="birthday-card" onClick={onClick}>
			<div className="avatar-container">
				<div className="avatar">
					<span>{staff.avatar}</span>
				</div>
			</div>

			<div className="staff-details">
				<h3 className="staff-name">{staff.name}</h3>
				<div className="detail-item">
					<i className="fas fa-building"></i>
					<span>{staff.department}</span>
				</div>

				<div className="detail-item">
					<i className="fas fa-calendar"></i>
					<span>{formatDate(staff.dateOfBirth)}</span>
				</div>

				<div className="detail-item">
					<i className="fas fa-envelope"></i>
					<span>{staff.email}</span>
				</div>

				<div className="detail-item">
					<i className="fas fa-phone"></i>
					<span>{staff.phone}</span>
				</div>
			</div>

			<div className="card-actions">
				{isTodayBirthday && (
					<div className="birthday-badge">Birthday Today!</div>
				)}

				{!isTodayBirthday && staff.daysUntil && (
					<div className="days-until">
						{staff.daysUntil} day{staff.daysUntil !== 1 ? "s" : ""}
					</div>
				)}

				<div className="notification-actions">
					<button className="action-btn email-btn" onClick={sendEmail}>
						Send Email
					</button>
					<button className="action-btn sms-btn" onClick={sendSMS}>
						Send SMS
					</button>
				</div>
			</div>
		</div>
	);
};

export default BirthdayCard;
