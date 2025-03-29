import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
	return (
		<>
			{isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

			<aside className={`sidebar ${isOpen ? "open" : ""}`}>
				<nav className="sidebar-nav">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "nav-item active" : "nav-item"
						}
						onClick={onClose}
						end
					>
						<i className="fas fa-tachometer-alt"></i>
						<span>Dashboard</span>
					</NavLink>

					<NavLink
						to="/calendar"
						className={({ isActive }) =>
							isActive ? "nav-item active" : "nav-item"
						}
						onClick={onClose}
					>
						<i className="fas fa-calendar-alt"></i>
						<span>Calendar</span>
					</NavLink>

					<NavLink
						to="/staff"
						className={({ isActive }) =>
							isActive ? "nav-item active" : "nav-item"
						}
						onClick={onClose}
					>
						<i className="fas fa-users"></i>
						<span>Staff</span>
					</NavLink>

					<div className="nav-divider"></div>

					<NavLink
						to="/notifications/settings"
						className={({ isActive }) =>
							isActive ? "nav-item active" : "nav-item"
						}
						onClick={onClose}
					>
						<i className="fas fa-bell"></i>
						<span>Notification Settings</span>
					</NavLink>

					<NavLink
						to="/notifications/logs"
						className={({ isActive }) =>
							isActive ? "nav-item active" : "nav-item"
						}
						onClick={onClose}
					>
						<i className="fas fa-history"></i>
						<span>Notification Logs</span>
					</NavLink>
				</nav>

				<div className="sidebar-footer">
					<span>Birthday Reminder v1.0</span>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
