import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import "./BirthdayStatistics.css";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BirthdayStatistics = ({ statistics }) => {
	// Sort statistics by month number
	const sortedStats = Object.entries(statistics)
		.map(([key, value]) => value)
		.sort((a, b) => a.monthNumber - b.monthNumber);

	const monthNames = sortedStats.map((month) => month.name);
	const counts = sortedStats.map((month) => month.count);

	// Check if we're in dark mode
	const isDarkMode = document.body.classList.contains("dark-theme");

	const chartData = {
		labels: monthNames,
		datasets: [
			{
				label: "Number of Birthdays",
				data: counts,
				backgroundColor: [
					"rgba(0, 112, 243, 0.8)", // January
					"rgba(0, 112, 243, 0.8)", // February
					"rgba(0, 112, 243, 0.8)", // March
					"rgba(0, 112, 243, 0.8)", // April
					"rgba(0, 112, 243, 0.8)", // May
					"rgba(0, 112, 243, 0.8)", // June
					"rgba(0, 112, 243, 0.8)", // July
					"rgba(0, 112, 243, 0.8)", // August
					"rgba(0, 112, 243, 0.8)", // September
					"rgba(0, 112, 243, 0.8)", // October
					"rgba(0, 112, 243, 0.8)", // November
					"rgba(0, 112, 243, 0.8)", // December
				],
				borderColor: [
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
					"rgba(0, 112, 243, 1)",
				],
				borderWidth: 1,
				borderRadius: 4,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			tooltip: {
				backgroundColor: isDarkMode
					? "rgba(0, 0, 0, 0.8)"
					: "rgba(255, 255, 255, 0.9)",
				titleColor: isDarkMode ? "#ffffff" : "#000000",
				bodyColor: isDarkMode ? "#e0e0e0" : "#333333",
				borderColor: isDarkMode ? "#333333" : "#e0e0e0",
				borderWidth: 1,
				padding: 8,
				cornerRadius: 4,
				displayColors: false,
				titleFont: {
					size: 12,
					weight: "bold",
					family: "var(--font-sans)",
				},
				bodyFont: {
					size: 11,
					family: "var(--font-sans)",
				},
				callbacks: {
					label: function (context) {
						let value = context.raw;
						return value === 1 ? "1 staff member" : `${value} staff members`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					precision: 0,
					color: isDarkMode ? "#a0a0a0" : "#666666",
					font: {
						size: 10,
						family: "var(--font-sans)",
					},
				},
				grid: {
					color: isDarkMode
						? "rgba(255, 255, 255, 0.06)"
						: "rgba(0, 0, 0, 0.06)",
					drawBorder: false,
				},
			},
			x: {
				ticks: {
					color: isDarkMode ? "#a0a0a0" : "#666666",
					font: {
						size: 10,
						family: "var(--font-sans)",
					},
				},
				grid: {
					display: false,
					drawBorder: false,
				},
			},
		},
	};

	return (
		<div className="statistics-container">
			<div className="statistics-header">
				<h2>Birthday Statistics</h2>
			</div>
			<div className="statistics-content">
				<div className="chart-container">
					<Bar data={chartData} options={chartOptions} />
				</div>
			</div>
		</div>
	);
};

export default BirthdayStatistics;
