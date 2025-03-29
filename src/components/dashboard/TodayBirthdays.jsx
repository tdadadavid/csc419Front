import React from "react";
import "./Dashboard.css";

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
		<div className="today-birthdays">
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
												aria-label="Send email notification"
											>
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
													<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
													<polyline points="22,6 12,13 2,6"></polyline>
												</svg>
											</button>
										)}
										{staff.phone && (
											<button
												className="action-button sms"
												onClick={(e) => sendNotification(e, staff.id, "sms")}
												title="Send SMS"
												aria-label="Send SMS notification"
											>
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
											</button>
										)}
									</div>
								</div>
								<div className="birthday-badge today">
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
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
										<circle cx="12" cy="7" r="4"></circle>
									</svg>
									<span>Today</span>
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
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
							<line x1="16" y1="2" x2="16" y2="6"></line>
							<line x1="8" y1="2" x2="8" y2="6"></line>
							<line x1="3" y1="10" x2="21" y2="10"></line>
						</svg>
						<p>No birthdays today</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TodayBirthdays;
