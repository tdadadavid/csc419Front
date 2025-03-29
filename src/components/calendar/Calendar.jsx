import React, { useState, useEffect } from 'react';
import api from '../../services/axios';
import './Calendar.css';

const Calendar = () => {
	const [calendarData, setCalendarData] = useState({
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		dateFormatted: "",
		daysInMonth: 31,
		firstDayOfMonth: 0,
		prevMonth: {},
		nextMonth: {},
		birthdays: {},
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchCalendarData = async (month, year) => {
		try {
			setLoading(true);
			const response = await api.get(`/calendar?month=${month}&year=${year}`);
			setCalendarData(response.data);
			setError("");
		} catch (err) {
			console.error("Error fetching calendar data:", err);
			setError("Failed to load calendar data. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCalendarData(calendarData.month, calendarData.year);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const navigateToPrevMonth = () => {
		fetchCalendarData(
			calendarData.prevMonth.month,
			calendarData.prevMonth.year
		);
	};

	const navigateToNextMonth = () => {
		fetchCalendarData(
			calendarData.nextMonth.month,
			calendarData.nextMonth.year
		);
	};

	if (loading && !calendarData.dateFormatted) {
		return (
			<div className="calendar-loading">
				<div className="loading-spinner"></div>
				<p>Loading calendar...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="calendar-error">
				<i className="fas fa-exclamation-circle"></i>
				<p>{error}</p>
				<button
					onClick={() =>
						fetchCalendarData(calendarData.month, calendarData.year)
					}
				>
					Retry
				</button>
			</div>
		);
	}

	const today = new Date();
	const isToday = (day) => {
		return (
			day === today.getDate() &&
			calendarData.month === today.getMonth() + 1 &&
			calendarData.year === today.getFullYear()
		);
	};

	return (
		<div className="calendar-container">
			<div className="calendar-header">
				<h1>Birthday Calendar</h1>
				<div className="calendar-navigation">
					<button onClick={navigateToPrevMonth} className="nav-button">
						<i className="fas fa-chevron-left">⏮️</i>
					</button>
					<h2>{calendarData.dateFormatted}</h2>
					<button onClick={navigateToNextMonth} className="nav-button">
						<i className="fas fa-chevron-right">⏭️</i>
					</button>
				</div>
			</div>

			<div className="calendar-grid">
				{/* Day labels */}
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<div key={day} className="calendar-day-label">
						{day}
					</div>
				))}

				{/* Empty cells for days before the 1st */}
				{[...Array(calendarData.firstDayOfMonth)].map((_, index) => (
					<div key={`empty-${index}`} className="calendar-day empty"></div>
				))}

				{/* Calendar days */}
				{[...Array(calendarData.daysInMonth)].map((_, index) => {
					const day = index + 1;
					const dayBirthdays = calendarData.birthdays[day] || [];
					const hasBirthdays = dayBirthdays.length > 0;

					return (
						<div
							key={`day-${day}`}
							className={`calendar-day ${isToday(day) ? "today" : ""} ${
								hasBirthdays ? "has-birthdays" : ""
							}`}
						>
							<div className="day-number">{day}</div>

							{hasBirthdays && (
								<div className="day-birthdays">
									{dayBirthdays.slice(0, 3).map((staff) => (
										<div key={staff.id} className="day-birthday-item">
											<span className="birthday-name">{staff.name}</span>
										</div>
									))}

									{dayBirthdays.length > 3 && (
										<div className="more-birthdays">
											+{dayBirthdays.length - 3} more
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>

			{loading && (
				<div className="calendar-overlay">
					<div className="loading-spinner"></div>
				</div>
			)}
		</div>
	);
};

export default Calendar;