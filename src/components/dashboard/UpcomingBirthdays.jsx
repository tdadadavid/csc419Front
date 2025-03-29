import React, { useState } from "react";
import "./DashboardCards.css";
import StaffDetailModal from "./StaffDetailsModal";

const UpcomingBirthdays = ({ birthdays }) => {
	const [selectedStaff, setSelectedStaff] = useState(null);

	const birthdaysArray = Array.isArray(birthdays)
		? birthdays
		: Object.values(birthdays);

	return (
		<div className="dashboard-card upcoming-birthdays">
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
									<i className="fas fa-hourglass-half"></i>
									<span>
										{staff.days_until_birthday === 1
											? "Tomorrow"
											: `${
													calculateDaysUntilBirthday(staff)
											  } days`}
									</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="empty-state">
						<i className="far fa-calendar"></i>
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
