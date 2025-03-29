import React, { useState } from "react";
import BirthdayList from "./BirthdayList";
import "./BirthdayTabs.css";

const BirthdayTabs = () => {
	const [activeTab, setActiveTab] = useState("today");

	return (
		<div className="birthday-tabs-container">
			<div className="tabs-header">
				<button
					className={`tab-btn ${activeTab === "today" ? "active" : ""}`}
					onClick={() => setActiveTab("today")}
				>
					Today
				</button>
				<button
					className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
					onClick={() => setActiveTab("upcoming")}
				>
					Upcoming
				</button>
				<button
					className={`tab-btn ${activeTab === "calendar" ? "active" : ""}`}
					onClick={() => setActiveTab("calendar")}
				>
					Calendar
				</button>
			</div>

			<div className="tab-content">
				{activeTab === "today" && <BirthdayList type="today" />}

				{activeTab === "upcoming" && <BirthdayList type="upcoming" />}

				{activeTab === "calendar" && (
					<div className="calendar-placeholder">
						<p>Calendar view will be implemented here</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default BirthdayTabs;
