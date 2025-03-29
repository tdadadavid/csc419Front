// src/components/staff/BirthdayCelebrationModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import "./BirthdayCelebration.css";

// Import this directly in your component instead of using a separate import
// This helps ensure the module is properly loaded
const ReactConfetti = React.lazy(() => import("react-confetti"));

const BirthdayCelebrationModal = ({ staff, onClose }) => {
	const audioRef = useRef(null);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [showConfetti, setShowConfetti] = useState(false);

	// Update window size when window is resized
	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		// Set a timeout before showing confetti to ensure modal is rendered
		const timer = setTimeout(() => {
			setShowConfetti(true);
		}, 100);

		// Try playing the sound with a user-triggered event simulation
		if (audioRef.current) {
			// Set a low volume for better user experience
			audioRef.current.volume = 0.3;

			// Create a promise to play audio with fallback
			const playPromise = audioRef.current.play();

			// Handle promise rejection (happens when browsers block autoplay)
			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.log("Audio autoplay prevented:", error);

					// Instead, add a manual play button that will appear if autoplay fails
					document.getElementById("audio-play-button").style.display = "block";
				});
			}
		}

		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
			clearTimeout(timer);
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}
		};
	}, []);

	// Function to manually play the audio (for browsers that block autoplay)
	const playAudio = () => {
		if (audioRef.current) {
			audioRef.current
				.play()
				.then(() => {
					document.getElementById("audio-play-button").style.display = "none";
				})
				.catch((error) => {
					console.error("Manual play failed:", error);
				});
		}
	};

	const calculateAge = (dateOfBirth) => {
		const birthDate = new Date(dateOfBirth);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	return (
		<div className="birthday-modal-backdrop" onClick={onClose}>
			{/* Confetti component with React.Suspense for loading */}
			<React.Suspense fallback={null}>
				{showConfetti && (
					<ReactConfetti
						width={windowSize.width}
						height={windowSize.height}
						recycle={true}
						numberOfPieces={200}
						tweenDuration={5000}
						colors={[
							"#ff718d",
							"#fdbb2d",
							"#22c1c3",
							"#b721ff",
							"#ffdd00",
							"#21d4fd",
						]}
					/>
				)}
			</React.Suspense>

			<div
				className="birthday-modal-content"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="birthday-modal-header">
					<h2>Happy Birthday!</h2>
					<button className="close-button" onClick={onClose}>
						<i className="fas fa-times"></i>
					</button>
				</div>

				<div className="birthday-modal-body">
					<div className="birthday-animation">
						<div className="cake">
							<div className="cake-top"></div>
							<div className="cake-middle"></div>
							<div className="cake-bottom"></div>

							<div className="candle">
								<div className="flame"></div>
							</div>
						</div>
					</div>

					<div className="celebrant-profile">
						<div className="celebrant-avatar">
							<div className="avatar-initials">
								{staff.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</div>
						</div>
						<div className="celebrant-info">
							<h3>{staff.name}</h3>
							<p className="celebrant-department">{staff.department}</p>
							<div className="celebrant-age">
								Turning {calculateAge(staff.date_of_birth)} years old today!
							</div>
						</div>
					</div>

					<div className="birthday-message">
						<p>
							{staff.custom_message ||
								`Happy Birthday, ${
									staff.name.split(" ")[0]
								}! Wishing you a fantastic day filled with joy and celebration. Best wishes from all of us at the Faculty of Science, UNILAG.`}
						</p>
					</div>

					<div className="celebrant-details">
						<div className="detail-item">
							<i className="fas fa-envelope"></i>
							<span>{staff.email}</span>
						</div>
						<div className="detail-item">
							<i className="fas fa-phone"></i>
							<span>{staff.phone || "No phone number"}</span>
						</div>
						<div className="detail-item">
							<i className="fas fa-birthday-cake"></i>
							<span>
								Born on {format(new Date(staff.date_of_birth), "MMMM d, yyyy")}
							</span>
						</div>
					</div>

					{/* Manual audio play button (hidden by default, shows only if autoplay fails) */}
					<button
						id="audio-play-button"
						onClick={playAudio}
						className="play-audio-button"
						style={{ display: "none" }}
					>
						<i className="fas fa-music"></i> Play Birthday Song
					</button>
				</div>

				<div className="birthday-modal-footer">
					<div className="notification-actions">
						<button
							className="action-btn email-btn"
							onClick={(e) => {
								e.stopPropagation();
								console.log(`Sending email to ${staff.name}`);
								// Implement your email notification logic
							}}
						>
							<i className="fas fa-envelope"></i> Send Birthday Email
						</button>
						<button
							className="action-btn sms-btn"
							onClick={(e) => {
								e.stopPropagation();
								console.log(`Sending SMS to ${staff.name}`);
								// Implement your SMS notification logic
							}}
						>
							<i className="fas fa-sms"></i> Send Birthday SMS
						</button>
					</div>
				</div>
			</div>

			{/* Birthday song audio */}
			<audio ref={audioRef} loop>
				<source src="/birthday-song.mp3" type="audio/mpeg" />
				<source src="/birthday-song.ogg" type="audio/ogg" />
				Your browser does not support the audio element.
			</audio>
		</div>
	);
};

export default BirthdayCelebrationModal;
