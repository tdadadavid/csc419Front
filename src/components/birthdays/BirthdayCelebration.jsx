import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./BirthdayCelebration.css";

const BirthdayCelebration = ({ staff, onClose }) => {
	const { width, height } = useWindowSize();

	return (
		<div className="celebration-overlay" onClick={onClose}>
			<Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={500}
			/>

			<div className="celebration-content" onClick={(e) => e.stopPropagation()}>
				<div className="celebration-cake">
					<div className="cake">
						<div className="candle">
							<div className="flame"></div>
						</div>
					</div>
				</div>

				<h2 className="celebration-text">Happy Birthday!</h2>
				<p className="celebration-name">{staff.name}</p>

				<div className="celebration-actions">
					<button
						className="action-btn email-btn"
						onClick={() =>
							console.log(`Sending birthday email to ${staff.email}`)
						}
					>
						<i className="fas fa-envelope"></i> Send Birthday Email
					</button>
					<button
						className="action-btn sms-btn"
						onClick={() =>
							console.log(`Sending birthday SMS to ${staff.phone}`)
						}
					>
						<i className="fas fa-sms"></i> Send Birthday SMS
					</button>
				</div>
			</div>
		</div>
	);
};

export default BirthdayCelebration;
