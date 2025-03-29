// src/components/staff/StaffDetailModal.jsx
import React from "react";
import "./StaffDetailModal.css";

const StaffDetailModal = ({ staff, onClose }) => {
	if (!staff) return null;

	// Calculate age from date of birth
	const calculateAge = (dateOfBirth) => {
		const birthDate = new Date(dateOfBirth);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	// Format date to Month Day, Year
	const formatDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(date).toLocaleDateString("en-US", options);
	};

	// Calculate next birthday
	const getNextBirthday = (dateOfBirth) => {
		const today = new Date();
		const birthdate = new Date(dateOfBirth);
		const nextBirthday = new Date(
			today.getFullYear(),
			birthdate.getMonth(),
			birthdate.getDate()
		);

		if (nextBirthday < today) {
			nextBirthday.setFullYear(today.getFullYear() + 1);
		}

		const diffTime = Math.abs(nextBirthday - today);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return {
			days: diffDays,
			date: nextBirthday,
		};
	};

	const nextBirthday = getNextBirthday(staff.date_of_birth);

	return (
		<div className="square-modal-backdrop" onClick={onClose}>
			<div
				className="square-modal-content"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Staff header with avatar */}
				<div className="square-modal-header">
					<div className="staff-avatar">
						{staff.name
							.split(" ")
							.map((n) => n[0].toUpperCase())
							.slice(0, 2)
							.join("")}
					</div>
					<div className="header-info">
						<h2>{staff.name}</h2>
						<p>{staff.department}</p>
						{isBirthdayToday(staff.date_of_birth) && (
							<div className="birthday-pill">Birthday Today!</div>
						)}
					</div>
				</div>

				<div className="square-modal-divider"></div>

				{/* Staff Details section */}
				<div className="square-modal-body">
					<h3>Staff Details</h3>

					<div className="detail-item">
						<div className="detail-label">EMAIL</div>
						<div className="detail-value">{staff.email}</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">PHONE</div>
						<div className="detail-value">{staff.phone}</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">DATE OF BIRTH</div>
						<div className="detail-value">
							{formatDate(staff.date_of_birth)}
						</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">AGE</div>
						<div className="detail-value">
							{calculateAge(staff.date_of_birth)} years
						</div>
					</div>

					<div className="detail-item">
						<div className="detail-label">CUSTOM BIRTHDAY MESSAGE</div>
						<div className="message-content">
							{staff.custom_message || "No custom message set"}
						</div>
					</div>

					<div className="square-modal-divider"></div>

					<h3>Next Birthday</h3>
					<div className="next-birthday-box">
						<p>In {nextBirthday.days} days</p>
						<p>{formatDate(nextBirthday.date)}</p>
					</div>
				</div>

				{/* Action buttons */}
				<div className="square-modal-footer">
					<button
						className="email-button"
						onClick={() => console.log("Send email")}
					>
						SEND EMAIL
					</button>
					<button
						className="sms-button"
						onClick={() => console.log("Send SMS")}
					>
						SEND SMS
					</button>
				</div>
			</div>
		</div>
	);
};

// Helper function to check if today is the staff's birthday
const isBirthdayToday = (dateOfBirth) => {
	const today = new Date();
	const birthDate = new Date(dateOfBirth);
	return (
		today.getMonth() === birthDate.getMonth() &&
		today.getDate() === birthDate.getDate()
	);
};

export default StaffDetailModal;
