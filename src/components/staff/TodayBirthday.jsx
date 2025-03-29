// src/components/dashboard/TodayBirthdays.jsx
import React from "react";
import "./DashboardCards.css";

const TodayBirthdays = ({ birthdays, onSelectCelebrant }) => {
	const sendNotification = async (e, staffId, type) => {
		e.stopPropagation(); // Prevent opening the modal when clicking notification buttons
		try {
			// Implement your notification sending logic here
			console.log(`Sending ${type} notification to staff ID: ${staffId}`);
			// You can call your API here
		} catch (error) {
			console.error(`Error sending ${type} notification:`, error);
		}
	};

	return (
		<div className="dashboard-card today-birthdays">
			<div className="card-header">
				<h2>Today's Birthdays</h2>
				<span className="badge primary">{birthdays.length} Celebrations</span>
			</div>

			<div className="card-content">
				{birthdays.length > 0 ? (
					<div className="birthday-list">
						{birthdays.map((staff) => (
							<div
								key={staff.id}
								className="birthday-item today"
								onClick={() => onSelectCelebrant(staff)}
							>
								<div className="birthday-info">
									<h3>{staff.name}</h3>
									<p className="department">{staff.department}</p>
									<div className="birthday-actions">
										{staff.email && (
											<button
												className="action-button email"
												onClick={(e) => sendNotification(e, staff.id, "email")}
												title="Send email"
											>
												<i className="fas fa-envelope"></i>
											</button>
										)}
										{staff.phone && (
											<button
												className="action-button sms"
												onClick={(e) => sendNotification(e, staff.id, "sms")}
												title="Send SMS"
											>
												<i className="fas fa-sms"></i>
											</button>
										)}
									</div>
								</div>
								<div className="birthday-badge today">
									<i className="fas fa-birthday-cake"></i>
									<span>Today</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="empty-state">
						<i className="far fa-calendar-times"></i>
						<p>No birthdays today</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TodayBirthdays;
