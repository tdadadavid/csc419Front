import React, { useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import "./BirthdayCelebration.css";

const BirthdayCelebration = ({ staff, onClose }) => {
	const { width, height } = useWindowSize();

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

	// Get initials for avatar
	const getInitials = (name) => {
		if (!name) return "";
		return name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.slice(0, 3)
			.toUpperCase();
	};

	// Send email notification
	const sendEmailNotification = (e) => {
		e.stopPropagation();
		console.log(`Sending birthday email to ${staff.name} at ${staff.email}`);
		// Add your email sending functionality here
	};

	// Send SMS notification
	const sendSmsNotification = (e) => {
		e.stopPropagation();
		console.log(`Sending birthday SMS to ${staff.name} at ${staff.phone}`);
		// Add your SMS sending functionality here
	};

	// Close modal when clicking outside of it
	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	// Apply body styles to prevent scrolling while modal is open
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div className="celebration-overlay" onClick={handleBackdropClick}>
			<Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={200}
				gravity={0.15}
				colors={["#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6"]}
			/>

			<div className="celebration-modal">
				<div className="modal-header">
					<h2>Happy Birthday!</h2>
					<button className="close-button" onClick={onClose} aria-label="Close">
						×
					</button>
				</div>

				<div className="cake-container">
					<div className="cake">
						<div className="cake-layer-1"></div>
						<div className="cake-layer-2"></div>
						<div className="cake-layer-3"></div>
						<div className="candle">
							<div className="flame"></div>
						</div>
						<div className="shine"></div>
					</div>
				</div>

				<div className="celebrant-info">
					<div className="avatar">{getInitials(staff.name)}</div>
					<div className="info-text">
						<h3 className="celebrant-name">{staff.name}</h3>
						<p className="celebrant-title">{staff.department}</p>
						<div className="age-badge">
							Turning {calculateAge(staff.date_of_birth)} years old today!
						</div>
					</div>
				</div>

				<div className="message-container">
					<p className="message-text">
						{staff.custom_message ||
							`Happy Birthday, ${
								staff.name.split(" ")[0]
							}! Wishing you a fantastic day filled with joy and celebration. Best wishes from all of us at the Faculty of Science, UNILAG.`}
					</p>
				</div>

				<div className="action-buttons">
					{staff.email && (
						<button
							className="action-button email-button"
							onClick={sendEmailNotification}
						>
							<i className="fas fa-envelope"></i> Send Email
						</button>
					)}

					{staff.phone && (
						<button
							className="action-button sms-button"
							onClick={sendSmsNotification}
						>
							<i className="fas fa-comment-dots"></i> Send SMS
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default BirthdayCelebration;
