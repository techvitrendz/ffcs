import {
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	Grid,
	Switch,
	Tooltip,
	IconButton,
	Dialog,
	Slide,
	Button,
} from "@mui/material";
import Input from "../../components/input/Input";
import React, { useState, useEffect } from "react";
import styles from "./autoSlotForm.module.css";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	switch: {
		color: "#5aa9e6",
		"&:hover": {},
	},
}));

function AutoSlotForm({
	list,
	ttDatabase,
	setDataState,
	dataSentVar,
	receivedData,
	onToastMessageReceive,
}) {
	const [morningTheory, setMorningTheory] = useState(false);
	const [c1, setc1] = useState("");
	const [c2, setc2] = useState("");
	const [c3, setc3] = useState("");
	const [c4, setc4] = useState("");
	const [c5, setc5] = useState("");
	const [c6, setc6] = useState("");
	const [c7, setc7] = useState("");
	const [c8, setc8] = useState("");
	const [initial, setInitial] = useState({});
	// const [allSlots, setAllSlots] = useState([]);
	const [allSlots1, setAllSlots1] = useState([]);
	const [allSlots2, setAllSlots2] = useState([]);
	const [allSlots3, setAllSlots3] = useState([]);
	const [allSlots4, setAllSlots4] = useState([]);
	const [allSlots5, setAllSlots5] = useState([]);
	const [allSlots6, setAllSlots6] = useState([]);
	const [allSlots7, setAllSlots7] = useState([]);
	const [allSlots8, setAllSlots8] = useState([]);

	let courseArray = [];

	const handleChange = (event) => {
		setMorningTheory(event.target.checked);
	};

	const [open, setOpen] = useState(false);

	const [inputData, setinputData] = useState([]);

	const [courseDataJsonString, setcourseDataJsonString] = useState("initial");
	const [courseDataJsonObj, setcourseDataJsonObj] = useState({
		Slot: "Morning",
		CourseList: [],
	});

	// let courseDataJsonString;
	let dataObjString;

	// Function to reset the state after data is sent to backend
	const resetCoursesInputState = () => {
		setc1("");
		setc2("");
		setc3("");
		setc4("");
		setc5("");
		setc6("");
		setc7("");
	};

	//Main function
	const autoSlotPicker = () => {
		//this function needs to do 2 things
		// 1) needs to send data to the backend
		// 2) needs to update the dataSent hook in Timetable.jsx

		const courseObjMaker = () => {
			courseArray = [c1, c2, c3, c4, c5, c6, c7];
			let newCourseArray = courseArray.filter((course) => course.trim() != "");
			let CourseList = [...new Set(newCourseArray)];

			const Slot = morningTheory === true ? "Morning" : "Evening";
			const dataObj = {
				Slot,
				CourseList,
			};
			resetCoursesInputState();
			return dataObj;
		};

		const courseDataObj = courseObjMaker();
		sendData(courseDataObj);

	};

	let dummyObj = {
		Slot: "Morning",
		CourseList: ["CSE1002", "ITE1002", "ITE1003", "STS2021", "MAT2001"],
	};
	const receivedDataObj = (response) => {
		if (response.data.ListOfListOfCourses.length > 0) {
			receivedData(response.data.ListOfListOfCourses);
			setDataState();

		} else {
			onToastMessageReceive(
				"One of the courses doesn't have a morning/afternoon slot alloted, due to less slots given"
			);
		}
	};

	const sendData = async (payload) => {
		await axios
			.post(process.env.REACT_APP_AUTO_SLOT_BACKEND, payload)
			.then(receivedDataObj)
			.catch((err) => console.log(err));
	};

	const classes = useStyles();
	return (
		<>
			<ul className={styles.list}>
				<li>🕔 Choose preffered time </li>
				<li>
					✅ Type unique course codes of at max 7 courses (not accounting for
					mixed slots)
				</li>
				<li>
					✨ Click on the button and we'll show all possible timetables for you
				</li>
			</ul>
			<hr className={styles.sep} />
			<FormControl component="fieldset" className={styles.formControl}>
				<div className={styles.toggle}>
					<FormHelperText className={styles.formLabel}>
						Default is Evening Theory - Morning Lab
					</FormHelperText>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={morningTheory}
									onChange={handleChange}
									name="Morning Theory"
									color="primary"
									className={classes.switch}
								/>
							}
							label="Morning Theory - Evening Lab"
						/>
					</FormGroup>
				</div>
				<hr />
				<FormHelperText className={styles.text}>
					Add Course Codes
				</FormHelperText>
				<form className={styles.inputBoxes}>
					<div className={styles.inputContainer}>
						<Input
							className={styles.autoCourseInput}
							list={list}
							value={c1}
							codeSelected={c1}
							setCodeSelected={setc1}
							onChange={(e) => setc1(e.target.value)}
							placeholder="Enter course code 1"
						/>
					</div>
					<div className={styles.inputContainer}>
						<Input
							className={styles.autoCourseInput}
							list={list}
							codeSelected={c2}
							setCodeSelected={setc2}
							value={c2}
							onChange={(e) => setc2(e.target.value)}
							placeholder="Enter course code 2"
						/>
					</div>
					<div className={styles.inputContainer}>
						<Input
							className={styles.autoCourseInput}
							list={list}
							codeSelected={c3}
							setCodeSelected={setc3}
							value={c3}
							onChange={(e) => setc3(e.target.value)}
							placeholder="Enter course code 3"
						/>
					</div>
					<div className={styles.inputContainer}>
						<Input
							className={styles.autoCourseInput}
							list={list}
							codeSelected={c4}
							setCodeSelected={setc4}
							value={c4}
							onChange={(e) => setc4(e.target.value)}
							placeholder="Enter course code 4"
						/>
					</div>

					<div className={styles.inputContainer}>
						<Input
							className={styles.autoCourseInput}
							list={list}
							codeSelected={c5}
							setCodeSelected={setc5}
							value={c5}
							onChange={(e) => setc5(e.target.value)}
							placeholder="Enter course code 5"
						/>
					</div>

					<div className={styles.inputContainer}>
						<Input
							className={styles.autoCourseInput}
							list={list}
							codeSelected={c6}
							setCodeSelected={setc6}
							value={c6}
							onChange={(e) => setc6(e.target.value)}
							placeholder="Enter course code 6"
						/>
					</div>
					<div className={styles.inputContainer}>
						<Input
							className={styles.autoCourseInput}
							list={list}
							value={c7}
							onChange={(e) => setc7(e.target.value)}
							codeSelected={c7}
							setCodeSelected={setc7}
							placeholder="Enter course code 7"
						/>
					</div>
				</form>
				<Button className={styles.button} onClick={autoSlotPicker}>
					Make Timetables
				</Button>
			</FormControl>
		</>
	);
}

export default AutoSlotForm;
