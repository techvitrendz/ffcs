import styles from "./wayTable.module.css";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
	deleteBtn: {
		color: "#030303ff",
		"&:hover": {},
	},
}));

function WayTable({ data }) {
	const classes = useStyles();
	let totalCredits = 0;

	return (
		<div>
			<div id="courseListTable" className={styles.courseList}>
				<div className={"table-responsive"}>
					<table className={styles.wayTable}>
						<thead className={styles.header}>
							<tr>
								<th>Slot</th>
								<th>Code</th>
								<th>Course</th>
								<th>Faculty</th>
								<th>Venue</th>
								{/* <th>Credits</th> */}
							</tr>
						</thead>
						<tbody className={styles.tableBody}>
							{data?.map((item) => {
								totalCredits += Number(item.C);
								return (
									<tr>
										<td>{item.slot}</td>
										<td>{item.crcode}</td>
										<td>{item.cname}</td>
										<td>{item.ename}</td>
										<td>{item.venue}</td>
										{/* <td>{item.C}</td> */}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default WayTable;
