import React from "react";
import "./Container.css";

const Container = ({ children, fluid = false }) => {
	return (
		<div className={`container ${fluid ? "container-fluid" : ""}`}>
			{children}
		</div>
	);
};

export default Container;
