import React, { useState, useEffect } from "react";
import api from "../../services/axios";
import TodayBirthdays from "./TodayBirthdays";
import UpcomingBirthdays from "./UpcomingBirthdays";
import BirthdayStatistics from "./BirthdayStatistics";
import NotificationActivity from "./NotificationActivity";
import BirthdayCelebration from "../birthdays/BirthdayCelebration";
import "./Dashboard.css";

const Dashboard = () => {
	const [dashboardData, setDashboardData] = useState({
		todayBirthdays: [],
		upcomingBirthdays: [],
		months: [],
		todayBirthdaysCount: 0,
		recentLogs: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedCelebrant, setSelectedCelebrant] = useState(null);
	const [showCelebrationModal, setShowCelebrationModal] = useState(false);

	useEffect(() => {
		const fetchDashboard = async () => {
			try {
				setLoading(true);
				const response = await api.get("/dashboard");
				setDashboardData(response.data);
				setError("");
			} catch (err) {
				console.error("Error fetching dashboard data:", err);
				setError("Failed to load dashboard data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchDashboard();
	}, []);

	const handleCelebrantSelect = (staff) => {
		setSelectedCelebrant(staff);
		setShowCelebrationModal(true);
	};

	const handleCloseModal = () => {
		setSelectedCelebrant(null);
		setShowCelebrationModal(false);
	};

	if (loading) {
		return (
			<div className="dashboard-loading">
				<div className="loading-spinner"></div>
				<p>Loading dashboard...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="dashboard-error">
				<i className="fas fa-exclamation-circle"></i>
				<p>{error}</p>
				<button onClick={() => window.location.reload()}>Retry</button>
			</div>
		);
	}

	return (
		<div className="dashboard">
			<div className="dashboard-header">
				<h1>Dashboard</h1>
				<div className="dashboard-date">
					<i className="far fa-calendar-alt"></i>
					<span>
						{new Date().toLocaleDateString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>
			</div>

			{/* Statistics Chart Section */}
			<div className="statistics-section">
				<BirthdayStatistics statistics={dashboardData.months} />
			</div>

			{/* Birthday Cards Section */}
			<div className="birthdays-section">
				<TodayBirthdays
					birthdays={dashboardData.todayBirthdays}
					onSelectCelebrant={handleCelebrantSelect}
				/>
				<UpcomingBirthdays birthdays={dashboardData.upcomingBirthdays} />
			</div>

			{/* Notification Activity Section */}
			<div className="activity-section">
				<NotificationActivity logs={dashboardData.recentLogs} />
			</div>

			{/* Modern Birthday Celebration Modal */}
			{selectedCelebrant && showCelebrationModal && (
				<BirthdayCelebration
					staff={selectedCelebrant}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default Dashboard;
