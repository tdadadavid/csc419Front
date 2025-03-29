import React, { useState } from "react";
import "./Dashboard.css";
import StaffDetailModal from "./StaffDetailsModal";

const UpcomingBirthdays = ({ birthdays }) => {
	const [selectedStaff, setSelectedStaff] = useState(null);

	const birthdaysArray = Array.isArray(birthdays)
		? birthdays
		: Object.values(birthdays);

	return (
		<div className="upcoming-birthdays">
			<div className="card-header">
				<h2>Upcoming Birthdays</h2>
				<span className="badge success">Next 7 Days</span>
			</div>

			<div className="card-content">
				{birthdaysArray.length > 0 ? (
					<div className="birthday-list">
						{birthdaysArray.map((staff) => (
							<div
								key={staff.id}
								className="birthday-item upcoming"
								onClick={() => setSelectedStaff(staff)}
							>
								<div className="birthday-info">
									<h3>{staff.name}</h3>
									<p className="department">{staff.department}</p>
								</div>
								<div className="birthday-badge upcoming">
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
										<circle cx="12" cy="12" r="10"></circle>
										<polyline points="12 6 12 12 16 14"></polyline>
									</svg>
									<span>
										{staff.days_until_birthday === 1
											? "Tomorrow"
											: `${Math.ceil(calculateDaysUntilBirthday(staff))} days`}
									</span>
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
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="8" y1="15" x2="16" y2="15"></line>
							<line x1="9" y1="9" x2="9.01" y2="9"></line>
							<line x1="15" y1="9" x2="15.01" y2="9"></line>
						</svg>
						<p>No upcoming birthdays</p>
					</div>
				)}
			</div>

			{selectedStaff && (
				<StaffDetailModal
					staff={selectedStaff}
					onClose={() => setSelectedStaff(null)}
				/>
			)}
		</div>
	);
};

// Helper function to calculate days until birthday if not already provided
const calculateDaysUntilBirthday = (staff) => {
	// If the days_until_birthday property exists, use it
	if (staff.days_until_birthday !== undefined) {
		return staff.days_until_birthday;
	}

	// Otherwise calculate it
	const today = new Date();
	const birthDate = new Date(staff.date_of_birth);
	const nextBirthday = new Date(
		today.getFullYear(),
		birthDate.getMonth(),
		birthDate.getDate()
	);

	if (nextBirthday < today) {
		nextBirthday.setFullYear(today.getFullYear() + 1);
	}

	const diffTime = Math.abs(nextBirthday - today);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays;
};

export default UpcomingBirthdays;
