import React, { useState, useEffect } from "react";
import BirthdayCard from "./BirthdayCard";
import BirthdayCelebration from "./BirthdayCelebration";
import "./BirthdayList.css";

const BirthdayList = ({ type }) => {
	const [staffList, setStaffList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedStaff, setSelectedStaff] = useState(null);
	const [showCelebration, setShowCelebration] = useState(false);

	useEffect(() => {
		// In a real app, fetch data from API
		const fetchData = async () => {
			try {
				setLoading(true);
				// Simulated API call
				const mockData = {
					today: [
						{
							id: 1,
							name: "Dr. Funke Akindele",
							department: "Biology",
							email: "funke.akindele@unilag.edu.ng",
							phone: "+234 803 456 7890",
							dateOfBirth: "1980-05-16",
							avatar: "DFA",
						},
						{
							id: 2,
							name: "Dr. Emmanuel Okonkwo",
							department: "Physics",
							email: "emmanuel.okonkwo@unilag.edu.ng",
							phone: "+234 802 345 6789",
							dateOfBirth: "1982-05-17",
							avatar: "DEO",
						},
					],
					upcoming: [
						{
							id: 3,
							name: "Prof. Sarah Johnson",
							department: "Chemistry",
							email: "sarah.johnson@unilag.edu.ng",
							phone: "+234 805 678 1234",
							dateOfBirth: "1975-05-20",
							avatar: "PSJ",
							daysUntil: 2,
						},
						{
							id: 4,
							name: "Dr. Michael Adebayo",
							department: "Mathematics",
							email: "michael.adebayo@unilag.edu.ng",
							phone: "+234 807 123 4567",
							dateOfBirth: "1978-05-22",
							avatar: "DMA",
							daysUntil: 4,
						},
						{
							id: 5,
							name: "Mrs. Chioma Okafor",
							department: "Computer Science",
							email: "chioma.okafor@unilag.edu.ng",
							phone: "+234 809 876 5432",
							dateOfBirth: "1985-05-23",
							avatar: "MCO",
							daysUntil: 5,
						},
					],
				};

				// Set the data based on the tab type
				setStaffList(mockData[type] || []);
			} catch (error) {
				console.error("Error fetching birthday data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [type]);

	const handleStaffClick = (staff) => {
		setSelectedStaff(staff);
		if (type === "today") {
			setShowCelebration(true);
			// Hide celebration after 3 seconds
			setTimeout(() => {
				setShowCelebration(false);
			}, 3000);
		}
	};

	if (loading) {
		return (
			<div className="birthday-list-loading">
				<div className="spinner"></div>
				<p>Loading birthdays...</p>
			</div>
		);
	}

	return (
		<div className="birthday-list-container">
			<h2 className="list-title">
				{type === "today" ? "Today's Birthdays" : "Upcoming Birthdays"}
			</h2>
			<p className="list-subtitle">
				{type === "today"
					? "Staff celebrating birthdays today"
					: "Staff celebrating birthdays this week"}
			</p>

			{staffList.length === 0 ? (
				<div className="empty-list">
					<i className="fas fa-birthday-cake"></i>
					<p>No {type} birthdays</p>
				</div>
			) : (
				<div className="staff-list">
					{staffList.map((staff) => (
						<BirthdayCard
							key={staff.id}
							staff={staff}
							isTodayBirthday={type === "today"}
							onClick={() => handleStaffClick(staff)}
						/>
					))}
				</div>
			)}

			{/* Birthday celebration overlay */}
			{showCelebration && selectedStaff && (
				<BirthdayCelebration
					staff={selectedStaff}
					onClose={() => setShowCelebration(false)}
				/>
			)}
		</div>
	);
};

export default BirthdayList;
