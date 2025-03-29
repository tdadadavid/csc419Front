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
import "./DashboardCards.css";

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

	const chartData = {
		labels: monthNames,
		datasets: [
			{
				label: "Number of Birthdays",
				data: counts,
				backgroundColor: [
					"rgba(54, 162, 235, 0.6)", // January
					"rgba(153, 102, 255, 0.6)", // February
					"rgba(75, 192, 192, 0.6)", // March
					"rgba(255, 159, 64, 0.6)", // April
					"rgba(255, 99, 132, 0.6)", // May
					"rgba(255, 206, 86, 0.6)", // June
					"rgba(54, 162, 235, 0.6)", // July
					"rgba(75, 192, 192, 0.6)", // August
					"rgba(153, 102, 255, 0.6)", // September
					"rgba(255, 159, 64, 0.6)", // October
					"rgba(255, 99, 132, 0.6)", // November
					"rgba(255, 206, 86, 0.6)", // December
				],
				borderColor: [
					"rgba(54, 162, 235, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(255, 99, 132, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(255, 99, 132, 1)",
					"rgba(255, 206, 86, 1)",
				],
				borderWidth: 1,
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
				display: true,
				text: "Birthday Statistics",
				font: {
					size: 16,
					weight: "bold",
				},
				padding: {
					top: 10,
					bottom: 20,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					precision: 0,
				},
				title: {
					display: true,
					text: "Number of Staff",
				},
			},
			x: {
				title: {
					display: true,
					text: "Month",
				},
			},
		},
	};

	return (
		<div className="dashboard-card statistics-card">
			<div className="chart-container">
				<Bar data={chartData} options={chartOptions} height={300} />
			</div>
		</div>
	);
};

export default BirthdayStatistics;
