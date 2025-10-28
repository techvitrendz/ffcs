import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./coursetable.module.css";
import { makeStyles } from "@mui/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useStateValue } from "../../context/StateProvider";

const useStyles = makeStyles((theme) => ({
	deleteBtn: {
		color: "#ffffff",
		"&:hover": {},
	},
}));

function CourseTable({ currentSlot, setCurrentSlot, credits, setCredits }) {
	const { state, dispatch } = useStateValue();
	const { monday, tuesday, wednesday, thursday, friday, temp } = state;

	const [selectedSlots, setSelectedSlots] = useState([]);
	const [newArray1, setNewArray1] = useState(monday);
	const [newArray2, setNewArray2] = useState(tuesday);
	const [newArray3, setNewArray3] = useState(wednesday);
	const [newArray4, setNewArray4] = useState(thursday);
	const [newArray5, setNewArray5] = useState(friday);

	const deleteRow = (row) => {
		let newArr = currentSlot?.filter((course) => course.row.id !== row.id);

		let stringArr = newArr.map((course) => course.row.slot);
		dispatch({
			type: "DELETE_ROW",
			deleteRow: row,
		});

		setCredits(credits - parseInt(row.C, 10));

		setCurrentSlot(newArr);
	};

	const classes = useStyles();

	return (
		<div>
			<div id="courseListTable" className={styles.courseList}>
				<div className={"table-responsive"}>
					<table className={styles.courseTable}>
						<thead>
							<tr>
								<th>Slot</th>
								<th>Code</th>
								<th>Course</th>
								<th>Faculty</th>
								<th>Venue</th>
								<th>Credits</th>
							</tr>
						</thead>
						<tbody className={styles.tableBody}>
							{currentSlot?.map((selectedSlot) => (
								<tr>
									<td>{selectedSlot.row.slot}</td>
									<td>{selectedSlot.row.crcode}</td>
									<td>{selectedSlot.row.cname}</td>
									<td>{selectedSlot.row.ename}</td>
									<td>{selectedSlot.row.venue}</td>
									<td>{selectedSlot.row.C}</td>
									<td>
										<Button className={classes.deleteBtn}>
											<DeleteForeverIcon
												onClick={(event) => deleteRow(selectedSlot.row)}
											/>
										</Button>{" "}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CourseTable;
