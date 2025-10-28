import React from "react";
import styles from "./Toast.module.css";
import logo from "../../assets/logo.png";

function Toast({ children, type }) {
	return (
		<div
			className={
				type === "green"
					? styles.componentGreen
					: type === "yellow"
					? styles.componentYellow
					: styles.componentRed
			}
		>
			<div className={styles.imgCover}>
				<img src={logo} />
			</div>
			<div>{children}</div>
		</div>
	);
}

export default Toast;
