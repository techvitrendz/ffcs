import { useEffect, useRef, useState } from "react";
import Toast from "../toast/Toast";
import Footer from "../Footer";
import Cell from "../cell/Cell";
import CourseTable from "../coursetable/CourseTable";

import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";

import { useStateValue } from "../../context/StateProvider";

import { IconButton, Tooltip, Button, Drawer, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { FiFilter } from "react-icons/fi";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import styles from "./timetable.module.css";
import winter22Data from "../../data/Max_data_Fall23";
import AutoSlotForm from "../autoSlot/AutoSlotForm";
import axios from "axios";

import Input from "../../components/input/Input";

import { Pagination } from "@mui/material";
import usePagination from "../Pagination/Pagination.js";
import WayTable from "../autoSlot/wayTable/WayTable";
import { ModeToggle } from "@/components/mode-toggle";
import { logo } from "@/assets/index.js";

const useStyles = makeStyles((theme) => ({
	newTT: {
		color: "#ffffff",
		"&:hover": {},
	},
	filterSlot: {
		backgroundColor: "#7b1494",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#7b1494",
			color: "#fff",
			boxShadow: "0 8px 32px 0 rgba(0, 116, 227, 0.5)",
		},
	},
	addCourse: {
		backgroundColor: "rgba(0, 116, 227, 1)",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "rgba(0, 116, 227, 1)",
			color: "#ffffff",
			boxShadow: "0 8px 32px 0 rgba(0, 116, 227, 0.5)",
		},
	},
	autoSlotPickerBtn: {
		backgroundColor: "rgba(0, 116, 227, 1)",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "rgba(0, 116, 227, 1)",
			color: "#ffffff",
			boxShadow: "0 8px 32px 0 rgba(0, 116, 227, 0.5)",
		},
	},
	QuickVisualiseBtn: {
		backgroundColor: "rgb(56,142,60)",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "rgb(56,142,60)",
			color: "#ffffff",
			boxShadow: "0 8px 32px 0 rgb(56,142,60,0.5)",
		},
	},
	ToggleOtherFieldsBtn: {
		backgroundColor: "#ff5252",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "#ff5252",
			color: "#ffffff",
			boxShadow: "0 8px 32px 0 rgb(255,82,82,0.5)",
		},
	},

	addCourseDrawerDiv: {
		width: "38rem",
		marginLeft: "1rem",
		marginRight: "1rem",
		background: "rgba( 255, 255, 255, 0.05 )",
		boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
		borderRadius: "10px",
		border: "1px solid rgba( 255, 255, 255, 0.18 )",
	},
	customCourseDrawerDiv: {
		width: "32rem",
		marginLeft: "1rem",
		marginRight: "1rem",
		padding: "1rem",
		background: "rgba( 255, 255, 255, 0.05 )",
		boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
		borderRadius: "10px",
		border: "1px solid rgba( 255, 255, 255, 0.18 )",
	},
	addCustomCourseBtn: {
		backgroundColor: "#f7c028",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "#f7c028",
			color: "#ffffff",
		},
	},
	autoDrawer: {
		height: "50%",
	},
}));

//dummy data for auto slot picker
const autoDummyData = [
	[
		{
			crcode: "ITE1002",
			cname: "Web Technologies",
			ctype: "ELA",
			C: "1",
			venue: "SJT216",
			slot: "L57+L58",
			"ERP ID": "10567",
			ename: "VIJAYAN R",
			id: "2803",
		},
		{
			crcode: "MAT2001",
			cname: "Statistics for Engineers",
			ctype: "ELA",
			C: "1",
			venue: "SJT620A",
			slot: "L39+L40",
			"ERP ID": "13721",
			ename: "EASWARAMOORTHY",
			id: "375",
		},
		{
			crcode: "ITE1003",
			cname: "Database Management Systems",
			ctype: "ELA",
			C: "1",
			venue: "SJT216",
			slot: "L55+L56",
			"ERP ID": "10134",
			ename: "BIMAL KUMAR RAY",
			id: "2813",
		},
		{
			crcode: "CSE1002",
			cname: "Problem Solving and Object Oriented P",
			ctype: "LO",
			C: "3",
			venue: "GDN153",
			slot: "L41+L42+L43+L44+L53+L54",
			"ERP ID": "16337",
			ename: "MAHENTHIRAN S",
			id: "1190",
		},
		{
			crcode: "ITE1002",
			cname: "Web Technologies",
			ctype: "ETH",
			C: "2",
			venue: "SJT201",
			slot: "A1",
			"ERP ID": "10567",
			ename: "VIJAYAN R",
			id: "2802",
		},
		{
			crcode: "STS2021",
			cname: "Fundamentals of Aptitude",
			ctype: "SS",
			C: "1",
			venue: "SJT114",
			slot: "E1+TE1",
			"ERP ID": "ETHNUS",
			ename: "ETHNUS (APT)",
			id: "79",
		},
		{
			crcode: "MAT2001",
			cname: "Statistics for Engineers",
			ctype: "ETH",
			C: "3",
			venue: "CDMM301",
			slot: "F1+TF1",
			"ERP ID": "13721",
			ename: "EASWARAMOORTHY",
			id: "347",
		},
		{
			crcode: "ITE1003",
			cname: "Database Management Systems",
			ctype: "ETH",
			C: "2",
			venue: "SJT205",
			slot: "G1",
			"ERP ID": "10134",
			ename: "BIMAL KUMAR RAY",
			id: "2812",
		},
	],
	[
		{
			crcode: "ITE1002",
			cname: "Web Technologies",
			ctype: "ELA",
			C: "1",
			venue: "SJT216",
			slot: "L57+L58",
			"ERP ID": "10567",
			ename: "VIJAYAN R",
			id: "2803",
		},
		{
			crcode: "MAT2001",
			cname: "Statistics for Engineers",
			ctype: "ELA",
			C: "1",
			venue: "SJT620A",
			slot: "L39+L40",
			"ERP ID": "13721",
			ename: "EASWARAMOORTHY",
			id: "375",
		},
		{
			crcode: "ITE1003",
			cname: "Database Management Systems",
			ctype: "ELA",
			C: "1",
			venue: "SJT216",
			slot: "L55+L56",
			"ERP ID": "10134",
			ename: "BIMAL KUMAR RAY",
			id: "2813",
		},
		{
			crcode: "CSE1002",
			cname: "Problem Solving and Object Oriented P",
			ctype: "LO",
			C: "3",
			venue: "SMV110",
			slot: "L41+L42+L43+L44+L53+L54",
			"ERP ID": "14831",
			ename: "MONASH P",
			id: "1191",
		},
		{
			crcode: "ITE1002",
			cname: "Web Technologies",
			ctype: "ETH",
			C: "2",
			venue: "SJT201",
			slot: "A1",
			"ERP ID": "10567",
			ename: "VIJAYAN R",
			id: "2802",
		},
		{
			crcode: "STS2021",
			cname: "Fundamentals of Aptitude",
			ctype: "SS",
			C: "1",
			venue: "SJT114",
			slot: "E1+TE1",
			"ERP ID": "ETHNUS",
			ename: "ETHNUS (APT)",
			id: "79",
		},
		{
			crcode: "MAT2001",
			cname: "Statistics for Engineers",
			ctype: "ETH",
			C: "3",
			venue: "CDMM301",
			slot: "F1+TF1",
			"ERP ID": "13721",
			ename: "EASWARAMOORTHY",
			id: "347",
		},
		{
			crcode: "ITE1003",
			cname: "Database Management Systems",
			ctype: "ETH",
			C: "2",
			venue: "SJT205",
			slot: "G1",
			"ERP ID": "10134",
			ename: "BIMAL KUMAR RAY",
			id: "2812",
		},
	],
	[
		{
			crcode: "ITE1002",
			cname: "Web Technologies",
			ctype: "ELA",
			C: "1",
			venue: "SJT216",
			slot: "L57+L58",
			"ERP ID": "10567",
			ename: "VIJAYAN R",
			id: "2803",
		},
		{
			crcode: "MAT2001",
			cname: "Statistics for Engineers",
			ctype: "ELA",
			C: "1",
			venue: "SJT620A",
			slot: "L39+L40",
			"ERP ID": "13721",
			ename: "EASWARAMOORTHY",
			id: "375",
		},
		{
			crcode: "ITE1003",
			cname: "Database Management Systems",
			ctype: "ELA",
			C: "1",
			venue: "SJT216",
			slot: "L55+L56",
			"ERP ID": "10134",
			ename: "BIMAL KUMAR RAY",
			id: "2813",
		},
		{
			crcode: "CSE1002",
			cname: "Problem Solving and Object Oriented P",
			ctype: "LO",
			C: "3",
			venue: "SJT517",
			slot: "L31+L32+L41+L42+L45+L46",
			"ERP ID": "13298",
			ename: "JABANJALIN HILDA J",
			id: "1194",
		},
		{
			crcode: "ITE1002",
			cname: "Web Technologies",
			ctype: "ETH",
			C: "2",
			venue: "SJT201",
			slot: "A1",
			"ERP ID": "10567",
			ename: "VIJAYAN R",
			id: "2802",
		},
		{
			crcode: "STS2021",
			cname: "Fundamentals of Aptitude",
			ctype: "SS",
			C: "1",
			venue: "SJT114",
			slot: "E1+TE1",
			"ERP ID": "ETHNUS",
			ename: "ETHNUS (APT)",
			id: "79",
		},
		{
			crcode: "MAT2001",
			cname: "Statistics for Engineers",
			ctype: "ETH",
			C: "3",
			venue: "CDMM301",
			slot: "F1+TF1",
			"ERP ID": "13721",
			ename: "EASWARAMOORTHY",
			id: "347",
		},
		{
			crcode: "ITE1003",
			cname: "Database Management Systems",
			ctype: "ETH",
			C: "2",
			venue: "SJT205",
			slot: "G1",
			"ERP ID": "10134",
			ename: "BIMAL KUMAR RAY",
			id: "2812",
		},
	],
];

const columns = [
	{ field: "slot", headerName: "Slot", width: 170 },
	{ field: "cname", headerName: "Course", width: 200 },
	{ field: "ename", headerName: "Faculty Name", width: 230 },
	{
		field: "venue",
		headerName: "Venue",
		width: 120,
	},
];
const filterBySlotColumns = [
	{ field: "slot", headerName: "Slot", width: 160 },
	{ field: "cname", headerName: "Course", width: 320 },
	{ field: "crcode", headerName: "Code", width: 110 },
	{ field: "ename", headerName: "Faculty Name", width: 200 },
];
function TimeTable({ higherRef }) {
	const downloadTTRef = useRef();
	const [theme, setTheme] = useState("light");
	const classes = useStyles();
	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const { state, dispatch } = useStateValue();
	const { rowID, monday, tuesday, wednesday, thursday, friday } = state;

	const [credits, setCredits] = useState(0);
	const [customCode, setCustomCode] = useState("");
	const [customFaculty, setCustomFaculty] = useState("");
	const [customSlot, setCustomSlot] = useState("");
	const [customCredits, setCustomCredits] = useState("");
	const [customId, setCustomId] = useState(10000);
	const [customCourse, setCustomCourse] = useState("");
	const [customObj, setCustomObj] = useState({});
	const [customVenue, setCustomVenue] = useState();

	const [courseAdded, setCourseAdded] = useState(false);
	const [alreadyAdded, setAlreadyAdded] = useState(false);

	const [newArray1, setNewArray1] = useState(monday);
	const [newArray2, setNewArray2] = useState(tuesday);
	const [newArray3, setNewArray3] = useState(wednesday);
	const [newArray4, setNewArray4] = useState(thursday);
	const [newArray5, setNewArray5] = useState(friday);

	//this ia the state for updating the response object from backend
	const [possibleWays, setpossibleWays] = useState(autoDummyData);

	//this is if the object is empty
	const [emptyObj, setEmptyObj] = useState();

	useEffect(() => {
		setNewArray1(monday);
		setNewArray2(tuesday);
		setNewArray3(wednesday);
		setNewArray4(thursday);
		setNewArray5(friday);
	}, [monday, tuesday, wednesday, thursday, friday]);

	const separateSlots = (element) => {
		let arraySlots = [],
			i;
		arraySlots = element?.split("+");
		return arraySlots;
	};

	const getClashedSlot = (slotArr) => {
		let i,
			j,
			found = false;
		for (i = 0; i < currentSlot.length; i++) {
			for (j = 0; j < slotArr.length; j++) {
				if (currentSlot[i].row.slot.includes(slotArr[j])) {
					setClashedWith(currentSlot[i].row);
					found = true;
					break;
				}
			}
			if (found === true) {
				break;
			}
		}
	};

	const updateRowSelected = (id) => {
		if (currentSlot.length !== 0) {
			let i,
				j,
				flag = false;

			let newSeparated = separateSlots(id.row.slot);
			for (i = 0; i < currentSlot.length; i++) {
				if (currentSlot[i].row.id === id.row.id) {
					setAlreadyAdded(true);
					setaddCourseDrawerState(false);
					flag = true;
					setSuggestionsToast(false);
					break;
				}

				let currentSeparated = separateSlots(currentSlot[i].row.slot);
				for (j = 0; j < newSeparated?.length; j++) {
					if (newSeparated[j] !== "NIL") {
						if (currentSeparated?.includes(newSeparated[j])) {
							setClashed(true);
							setClashedWith(currentSlot[i].row);
							setaddCourseDrawerState(false);
							flag = true;
							setSuggestionsToast(false);
							break;
						}
					}
				}
			}

			if (flag === false) {
				newArray1?.map((a) => {
					let k = 0;
					for (k = 0; k < newSeparated?.length; k++) {
						if (a.splitSlots?.includes(newSeparated[k])) {
							if (a.selected === true) {
								setClashed(true);
								getClashedSlot(a.splitSlots);
								setaddCourseDrawerState(false);
								flag = true;
								setSuggestionsToast(false);
							}
						}
					}
				});
			}
			if (flag === false) {
				newArray2?.map((a) => {
					let k = 0;
					for (k = 0; k < newSeparated?.length; k++) {
						if (a.splitSlots?.includes(newSeparated[k])) {
							if (a.selected === true) {
								setClashed(true);
								getClashedSlot(a.splitSlots);
								setaddCourseDrawerState(false);
								flag = true;
								setSuggestionsToast(false);
							}
						}
					}
				});
			}

			if (flag === false) {
				newArray3?.map((a) => {
					let k = 0;
					for (k = 0; k < newSeparated?.length; k++) {
						if (a.splitSlots?.includes(newSeparated[k])) {
							if (a.selected === true) {
								setClashed(true);
								getClashedSlot(a.splitSlots);
								setaddCourseDrawerState(false);
								flag = true;
								setSuggestionsToast(false);
							}
						}
					}
				});
			}

			if (flag === false) {
				newArray4?.map((a) => {
					let k = 0;
					for (k = 0; k < newSeparated?.length; k++) {
						if (a.splitSlots?.includes(newSeparated[k])) {
							if (a.selected === true) {
								setClashed(true);
								getClashedSlot(a.splitSlots);
								setaddCourseDrawerState(false);
								flag = true;
								setSuggestionsToast(false);
							}
						}
					}
				});
			}

			if (flag === false) {
				newArray5?.map((a) => {
					let k = 0;
					for (k = 0; k < newSeparated?.length; k++) {
						if (a.splitSlots?.includes(newSeparated[k])) {
							if (a.selected === true) {
								setClashed(true);
								getClashedSlot(a.splitSlots);
								setaddCourseDrawerState(false);
								flag = true;
								setSuggestionsToast(false);
							}
						}
					}
				});
			}

			if (flag === false) {
				setCurrentSlot([...currentSlot, id]);
				setaddCourseDrawerState(false);
				setCredits(credits + parseInt(id.row.C, 10));
				setCourseAdded(true);
				setSuggestionsToast(false);
			}
		} else {
			setCurrentSlot([...currentSlot, id]);
			setaddCourseDrawerState(false);
			setCredits(credits + parseInt(id.row.C, 10));
			setCourseAdded(true);
			setSuggestionsToast(false);
		}
	};

	const addCustom = () => {
		if (
			!customCode |
			!customCourse |
			!customSlot |
			!customFaculty |
			!customCredits
		) {
			window.alert("Please enter valid details");
		} else {
			let arraySlots = [],
				i,
				trimmedSlot;
			arraySlots = customSlot?.split("+");
			trimmedSlot = arraySlots[0].trim();

			for (i = 1; i < arraySlots.length; i++) {
				trimmedSlot = trimmedSlot.concat("+", arraySlots[i].trim()); //L1+ L2+ L3 +L4
			}
			updateRowSelected({
				courseType: "custom",
				row: {
					courseowner: "VIT",
					crcode: customCode,
					cname: customCourse,
					ctype: "ETH",
					slot: trimmedSlot,
					ename: customFaculty,
					id: customId.toString(),
					C: customCredits,
					venue: customVenue,
				},
			});

			setCustomId(customId + 1);
			setLeftState(false);
		}
	};
	const valueRef = useRef(""); //creating a refernce for TextField Component
	// to get the data from api and store in a addCourseDrawerState variable
	const [list, setList] = useState([]);
	//cuurent slot is an empty array
	const [currentSlot, setCurrentSlot] = useState([]);
	// const [isChosen, setIsChosen] = useState(false);
	//below hook for the drawer option of add course
	const [addCourseDrawerState, setaddCourseDrawerState] = useState(false);

	const [leftState, setLeftState] = useState(false);

	const [autoDrawerState, setautoDrawerState] = useState(false);

	const [findBySlotState, setFindBySlotState] = useState(false);

	const [crcodeInput, setcrcodeInput] = useState("");

	const [openPopup, setOpenPopup] = useState(false);

	const [crCode, setCrCode] = useState("");

	//resetTimeTable
	const mondayTemp = [
		{ slot: "A1/L1", splitSlots: ["A1", "L1"], selected: false },
		{ slot: "F1/L2", splitSlots: ["F1", "L2"], selected: false },
		{ slot: "D1/L3", splitSlots: ["D1", "L3"], selected: false },
		{ slot: "TB1/L4", splitSlots: ["TB1", "L4"], selected: false },
		{ slot: "TG1/L5", splitSlots: ["TG1", "L5"], selected: false },
		{ slot: "L6", splitSlots: ["L6"], selected: false },
		{ slot: "A2/L31", splitSlots: ["A2", "L31"], selected: false },
		{ slot: "F2/L32", splitSlots: ["F2", "L32"], selected: false },
		{ slot: "D2/L33", splitSlots: ["D2", "L33"], selected: false },
		{ slot: "TG2/L35", splitSlots: ["TG2", "L35"], selected: false },
		{ slot: "V3/L36", splitSlots: ["V3", "L36"], selected: false },
	];

	const tuesdayTemp = [
		{ slot: "B1/L7", splitSlots: ["B1", "L7"], selected: false },
		{ slot: "G1/L8", splitSlots: ["G1", "L8"], selected: false },
		{ slot: "E1/L9", splitSlots: ["E1", "L9"], selected: false },
		{ slot: "TC1/L10", splitSlots: ["TC1", "L10"], selected: false },
		{ slot: "TAA1/L11", splitSlots: ["TAA1", "L11"], selected: false },
		{ slot: "L12", splitSlots: ["L12"], selected: false },
		{ slot: "B2/L37", splitSlots: ["B2", "L37"], selected: false },
		{ slot: "G2/L38", splitSlots: ["G2", "L38"], selected: false },
		{ slot: "E2/L39", splitSlots: ["E2", "L39"], selected: false },
		{ slot: "TC2/L40", splitSlots: ["TC2", "L40"], selected: false },
		{ slot: "TAA2/L41", splitSlots: ["TAA2", "L41"], selected: false },
		{ slot: "V4/L42", splitSlots: ["V4", "L42"], selected: false },
	];

	const wednesdayTemp = [
		{ slot: "C1/L13", splitSlots: ["C1", "L13"], selected: false },
		{ slot: "A1/L14", splitSlots: ["A1", "L14"], selected: false },
		{ slot: "F1/L15", splitSlots: ["F1", "L15"], selected: false },
		{ slot: "V1/L16", splitSlots: ["V1", "L16"], selected: false },
		{ slot: "V2/L17", splitSlots: ["V2", "L17"], selected: false },
		{ slot: "L18", splitSlots: ["L18"], selected: false },
		{ slot: "C2/L43", splitSlots: ["C2", "L43"], selected: false },
		{ slot: "A2/L44", splitSlots: ["A2", "L44"], selected: false },
		{ slot: "F2/L45", splitSlots: ["F2", "L45"], selected: false },
		{ slot: "TD2/L46", splitSlots: ["TD2", "L46"], selected: false },
		{ slot: "TBB2/L47", splitSlots: ["TBB2", "L47"], selected: false },
		{ slot: "V5/L48", splitSlots: ["V5", "L48"], selected: false },
	];

	const thursdayTemp = [
		{ slot: "D1/L19", splitSlots: ["D1", "L19"], selected: false },
		{ slot: "B1/L20", splitSlots: ["B1", "L20"], selected: false },
		{ slot: "G1/L21", splitSlots: ["G1", "L21"], selected: false },
		{ slot: "TE1/L22", splitSlots: ["TE1", "L22"], selected: false },
		{ slot: "TCC1/L23", splitSlots: ["TCC1", "L23"], selected: false },
		{ slot: "L24", splitSlots: ["L24"], selected: false },
		{ slot: "D2/L49", splitSlots: ["D2", "L49"], selected: false },
		{ slot: "B2/L50", splitSlots: ["B2", "L50"], selected: false },
		{ slot: "G2/L51", splitSlots: ["G2", "L51"], selected: false },
		{ slot: "TE2/L52", splitSlots: ["TE2", "L52"], selected: false },
		{ slot: "TCC2/L53", splitSlots: ["TCC2", "L53"], selected: false },
		{ slot: "V6/L54", splitSlots: ["V6", "L54"], selected: false },
	];

	const fridayTemp = [
		{ slot: "E1/L25", splitSlots: ["E1", "L25"], selected: false },
		{ slot: "C1/L26", splitSlots: ["C1", "L26"], selected: false },
		{ slot: "TA1/L27", splitSlots: ["TA1", "L27"], selected: false },
		{ slot: "TF1/L28", splitSlots: ["TF1", "L28"], selected: false },
		{ slot: "TD1/L29", splitSlots: ["TD1", "L29"], selected: false },
		{ slot: "L30", splitSlots: ["L30"], selected: false },
		{ slot: "E2/L55", splitSlots: ["E2", "L55"], selected: false },
		{ slot: "C2/L56", splitSlots: ["C2", "L56"], selected: false },
		{ slot: "TA2/L57", splitSlots: ["TA2", "L57"], selected: false },
		{ slot: "TF2/L58", splitSlots: ["TF2", "L58"], selected: false },
		{ slot: "TDD2/L59", splitSlots: ["TDD2", "L59"], selected: false },
		{ slot: "V7/L60", splitSlots: ["V7", "L60"], selected: false },
	];

	const [clashed, setClashed] = useState(false);
	const [clashedWith, setClashedWith] = useState({});

	const [toastMessage, setToastMessage] = useState("");
	const [showToast, setShowToast] = useState(false);

	const onToastMessageReceive = (message) => {
		setToastMessage(message);
		setShowToast(true);
	};

	useEffect(() => {
		if (courseAdded | clashed | alreadyAdded | showToast) resetToast();
	}, [courseAdded, clashed, alreadyAdded, showToast]);

	const resetToast = () => {
		setTimeout(() => {
			setClashed(false);
			setAlreadyAdded(false);
			setCourseAdded(false);
			setClashedWith({});
			setShowToast(false);
		}, 5000);
	};

	const toggleaddCourseDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setaddCourseDrawerState(open);
	};
	const toggleLeftDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setLeftState(open);
	};
	const toggleFindBySlotDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setFindBySlotState(open);
	};
	const toggleAutoDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setautoDrawerState(open);
	};

	const [inputDropDownData, setInputDropDownData] = useState([]);

	const [filterBySlotDropdownData, setFilterBySlotDropdownData] = useState([]);

	const generateDropDownData = () => {
		let i, j;

		let arr = [];
		arr.push(list[0]);

		for (i = 1; i < list.length; i++) {
			let flag = 1;
			for (j = 0; j < arr.length; j++) {
				if (arr[j].crcode === list[i].crcode) {
					flag++;
				}
			}
			if (flag === 1) {
				arr.push(list[i]);
			}
		}
		setInputDropDownData(arr);
	};
	const generateFilterBySlotDropDownData = () => {
		let i, j;

		let arr = [];
		arr.push(list[0]);

		for (i = 1; i < list.length; i++) {
			let flag = 1;
			for (j = 0; j < arr.length; j++) {
				if (arr[j].slot === list[i].slot) {
					flag++;
				}
			}
			if (flag === 1) {
				arr.push(list[i]);
			}
		}
		let uniqueSlotArr = [...new Set(arr)];
		setFilterBySlotDropdownData(uniqueSlotArr);
	};

	useEffect(() => {
		generateDropDownData();
		generateFilterBySlotDropDownData();
	}, [list]);
	useEffect(() => {
		setList(winter22Data);
	}, []);

	const [filterRows, setFilterRows] = useState(list);
	const [filterBySlotRows, setFilterBySlotRows] = useState(list);

	//state for updating preffered slot
	const [prefSlot, setPrefSlot] = useState("");
	const [prefCourse, setPrefCourse] = useState("");
	const [prefFaculty, setPrefFaculty] = useState("");

	//crCodeMatch is for searching through rows
	const updateRows = (crcodeMatch) => {
		const newRows = list?.filter((item) => item.crcode.includes(crcodeMatch));
		setFilterRows(newRows);
	};

	useEffect(() => {
		updateRows(crCode);
	}, [crCode]);

	//function for updating filter by slot rows
	const updateFilterBySlotRows = () => {
		if (prefSlot === "" && prefCourse === "" && prefFaculty === "") {
			setFilterBySlotRows([]);
		} else {
			let temp = list?.filter(
				(item) =>
					item.slot.includes(prefSlot) &&
					item.crcode.includes(prefCourse) &&
					item.ename.includes(prefFaculty)
			);
			setFilterBySlotRows([...temp]);
		}
	};

	useEffect(() => {
		updateFilterBySlotRows();
	}, [prefSlot, prefCourse, prefFaculty]);

	const getFaculty = (event) => {
		updateRows(crcodeInput);
		event.preventDefault(); //will stop the REFRESH
	};

	const resetTable = () => {
		dispatch({
			type: "RESET_ALL",
			reset1: mondayTemp,
			reset2: tuesdayTemp,
			reset3: wednesdayTemp,
			reset4: thursdayTemp,
			reset5: fridayTemp,
		});

		setCurrentSlot([]);
		setCredits(0);
	};
	const [waysPage, setWaysPage] = useState(1);

	const PER_PAGE = 24;

	const count = Math.ceil(possibleWays.length / PER_PAGE);
	const _DATA = usePagination(possibleWays, PER_PAGE);

	const handleWayChange = (e, p) => {
		setWaysPage(p);
		_DATA.jump(p);
	};

	//hook to check if data has been sent to backend
	const [dataSent, setDataSent] = useState(false);
	const setDataState = () => {
		setDataSent(true);
	};

	const printTable = () => {
		window.print();
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.plannerTitle}>
						<span>FFCS by VITrendZ</span>
					</h1>
					<ModeToggle />
				</div>

				{/* Button Container */}
				<div className={styles.buttonDiv}>
					{/* First Row - Filter and Add Course buttons */}
					<div className={styles.topRow}>
						<Tooltip
							title="Find courses for desired slot"
							placement="top"
							arrow
						>
							<Button
								variant="contained"
								startIcon={<FiFilter />}
								className={classes.filterSlot}
								onClick={toggleFindBySlotDrawer(true)}
								sx={{
									backgroundColor: "#cce0ff",
									color: "black",
									border: "2px solid #0047ff",
									borderRadius: "8px",
									padding: "8px 16px",
									fontSize: "0.9rem",
									fontWeight: "bold",
									"&:hover": {
										backgroundColor: "#99c2ff",
									},
								}}
							>
								Filter By Slot / Faculty
							</Button>
						</Tooltip>

						<Button
							variant="contained"
							startIcon={<ControlPointIcon />}
							className={classes.addCourse}
							onClick={toggleaddCourseDrawer(true)}
							sx={{
								backgroundColor: "#ff99cc",
								color: "black",
								border: "2px solid #ff33cc",
								borderRadius: "12px",
								"&:hover": {
									backgroundColor: "#ff66b2",
								},
							}}
						>
							Add Course
						</Button>
					</div>

					{/* Second Row - Other buttons */}
					<div className={styles.bottomRow}>
						<Tooltip title="Add courses with custom fields">
							<Button
								variant="outlined"
								color="secondary"
								className={classes.ToggleOtherFieldsBtn}
								onClick={toggleLeftDrawer(true)}
								sx={{
									backgroundColor: "#ff99cc",
									color: "black",
									border: "2px solid #ff33cc",
									borderRadius: "12px",
									"&:hover": {
										backgroundColor: "#ff66b2",
									},
								}}
							>
								Customised Course Addition
							</Button>
						</Tooltip>

						<Tooltip title="Auto Generate Timetables" placement="bottom" arrow>
							<Button
								className={classes.autoSlotPickerBtn}
								onClick={toggleAutoDrawer(true)}
								sx={{
									backgroundColor: "#cce0ff",
									color: "black",
									border: "2px solid #0047ff",
									borderRadius: "12px",
									borderColor: "#ff33cc",
									"&:hover": {
										backgroundColor: "#99c2ff",
									},
								}}
							>
								Auto Slot Picker
							</Button>
						</Tooltip>

						<Tooltip title="See and give own reviews of all faculties">
							<a
								href="https://faculty.vitrendz.com/"
								target="_blank"
								rel="noreferrer"
								style={{ textDecoration: "none" }}
							>
								<Button
									color="primary"
									className={classes.QuickVisualiseBtn}
									sx={{
										backgroundColor: "#cce0ff",
										color: "black",
										border: "2px solid #0047ff",
										borderRadius: "12px",
										"&:hover": {
											backgroundColor: "#99c2ff",
										},
									}}
								>
									Faculty Reviews
								</Button>
							</a>
						</Tooltip>

						{/* Tiny buttons */}
						<div className={styles.tinyBtnDiv}>
							<Tooltip title="Delete Timetable" placement="left" arrow>
								<IconButton onClick={resetTable}>
									<DeleteIcon className={classes.newTT} />
								</IconButton>
							</Tooltip>

							<div id="dontPrintBtn">
								<Tooltip
									title="Screenshot Timetable (enable background graphics)"
									placement="top"
									arrow
								>
									<IconButton onClick={printTable}>
										<AspectRatioIcon className={classes.newTT} />
									</IconButton>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>

				{/* Rest of your container content (timetable) */}
				<div id="timetable" className={styles.timetableDiv}>
					{/* Your timetable content goes here */}
				</div>
			</div>

			<Drawer
				anchor={"left"}
				open={findBySlotState}
				onClose={toggleFindBySlotDrawer(false)}
				className={styles.leftDrawer}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						overflowX: "hidden",
						height: "100%",
						width: "60rem",
						flexDirection: "column",
					}}
					className={styles.innerRightDrawer}
				>
					<h2 style={{ textAlign: "center" }}>😎 My Custom Filters</h2>
					<div
						className={classes.filterSlotDrawerDiv}
						style={{
							width: "55rem",
						}}
					>
						<ul style={{ listStyleType: "none", marginLeft: "-20px" }}>
							<li style={{ marginBottom: "4px" }}>
								😖 &nbsp; Have a free slot? Need a course?
							</li>
							<li style={{ marginBottom: "4px" }}>
								🤯 &nbsp; Want to know all the management courses offered in a
								slot?
							</li>
							<li style={{ marginBottom: "4px" }}>
								👩‍🏫 &nbsp; Do you want to know all courses your favorite faculty
								is taking this sem?
							</li>
							<li>
								💥 &nbsp; Enter your custom filters and know it all in one go!!
							</li>
						</ul>
						<div style={{ width: "100%" }}>
							<Tooltip title="ex. A1+TA1+TAA1" placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={prefSlot}
									onChange={(e) => setPrefSlot(e.target.value.toUpperCase())}
									placeholder="Enter Slot in + format"
									required
								/>
							</Tooltip>
							<Tooltip title="ex. MGT, HUM,..." placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={prefCourse}
									onChange={(e) => setPrefCourse(e.target.value.toUpperCase())}
									placeholder="First three letters of code"
									required
								/>
							</Tooltip>
							<Tooltip title="ex. SMART, FACE,..." placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={prefFaculty}
									onChange={(e) => setPrefFaculty(e.target.value.toUpperCase())}
									placeholder="Your favourite faculty name"
									required
								/>
							</Tooltip>
						</div>
						<div style={{ height: 360, width: "99%", margin: "4px" }}>
							<DataGrid
								rows={filterBySlotRows}
								getRowId={(list) => list.id}
								columns={filterBySlotColumns}
								pageSize={8}
								checkboxSelection={false}
							/>
						</div>
					</div>
				</div>
			</Drawer>

			{/* Add Course Drawer */}
			<Drawer
				anchor={"right"}
				open={addCourseDrawerState}
				onClose={toggleaddCourseDrawer(false)}
				className={styles.rightDrawer}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						overflowX: "hidden",
						height: "100%",
						width: "100%",
						flexDirection: "column",
					}}
					className={styles.innerRightDrawer}
				>
					<h2 style={{ textAlign: "center" }}>Add Course</h2>
					<div className={classes.addCourseDrawerDiv}>
						<ul style={{ listStyleType: "none", marginLeft: "-20px" }}>
							<li style={{ marginBottom: "4px" }}>
								🔢 &nbsp; Enter course code you want to add
							</li>
							<li>👨‍🏫 &nbsp; Select faculty-slot combo you want</li>
						</ul>
						<div style={{ width: "90%" }}>
							<Input
								className={classes.inputFieldCrCode}
								list={inputDropDownData}
								codeSelected={crCode}
								setCodeSelected={setCrCode}
								placeholder="Enter course code"
								style={{
									outline: "none !important",
									border: "none !important",
								}}
							/>
						</div>
						<div style={{ height: 360, width: "99%", margin: "4px" }}>
							<DataGrid
								rows={filterRows}
								getRowId={(list) => list.id}
								columns={columns}
								pageSize={5}
								checkboxSelection={false}
								onRowClick={(row) => updateRowSelected(row)}
							/>
						</div>
					</div>
				</div>
			</Drawer>

			{/* Custom Course Addition Drawer */}
			<Drawer
				anchor={"left"}
				open={leftState}
				onClose={toggleLeftDrawer(false)}
				className={styles.leftDrawer}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "left",
						overflowX: "hidden",
						flexDirection: "column",
						width: "100%",
						height: "100%",
					}}
				>
					<h2
						style={{
							marginTop: "2.5rem",
							marginBottom: "2.5rem",
							textAlign: "center",
							width: "100%",
						}}
					>
						Add Custom Faculty and Slots
					</h2>
					<div className={classes.customCourseDrawerDiv}>
						<ul
							style={{
								listStyleType: "none",
								marginLeft: "-4px",
							}}
						>
							<li style={{ marginBottom: "4px" }}>
								⌨ &nbsp; Enter course code you want to add
							</li>
							<li style={{ marginBottom: "4px" }}>
								👩‍💻 &nbsp; Enter your slot, faculty, venue, credits
							</li>
							<li>💥&nbsp; Add this custom course!</li>
						</ul>
						<div style={{ marginLeft: "30px", marginTop: "30px" }}>
							<Tooltip title="ex. CSE1001" placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={customCode}
									onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
									placeholder="Enter course code"
									required
								/>
							</Tooltip>
							<Tooltip
								title="ex. Data Structure and Algorithms"
								placement="top"
								arrow
							>
								<input
									className={styles.customCourseInput}
									value={customCourse}
									onChange={(e) => setCustomCourse(e.target.value)}
									placeholder="Enter course name"
									required
								/>
							</Tooltip>
							<Tooltip title="ex. R Kumar" placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={customFaculty}
									onChange={(e) => setCustomFaculty(e.target.value)}
									placeholder="Enter Faculty Name"
									required
								/>
							</Tooltip>
							<Tooltip title="ex. A1+TA1+TAA1" placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={customSlot}
									onChange={(e) => setCustomSlot(e.target.value.toUpperCase())}
									placeholder="Enter Slot in + format"
									required
								/>
							</Tooltip>
							<Tooltip title="ex. 4" placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={customCredits}
									onChange={(e) => setCustomCredits(e.target.value)}
									placeholder="Enter Credits for this course"
									required
								/>
							</Tooltip>
							<Tooltip title="ex. SJT001" placement="top" arrow>
								<input
									className={styles.customCourseInput}
									value={customVenue}
									onChange={(e) => setCustomVenue(e.target.value)}
									placeholder="Enter Venue (optional)"
								/>
							</Tooltip>
						</div>
						<br />
						<Button
							variant="contained"
							startIcon={<ControlPointIcon />}
							className={classes.addCustomCourseBtn}
							onClick={addCustom}
							style={{
								float: "right",
								marginRight: "1rem",
								marginTop: "20px",
								marginBottom: "10px",
							}}
						>
							Add Course
						</Button>
					</div>
				</div>
			</Drawer>

			{/* Auto Slot Picker Drawer */}
			<Drawer
				anchor={"bottom"}
				open={autoDrawerState}
				onClose={toggleAutoDrawer(false)}
				className={styles.autoDrawer}
			>
				{dataSent == true ? (
					<Box p="5" className={styles.waysBox}>
						<div className={styles.waysTitle}>Timetable {waysPage}</div>
						<div>These are the possible ways you could make your timetable</div>
						<WayTable data={possibleWays[waysPage - 1]} />
						<Pagination
							count={possibleWays.length}
							size="large"
							page={waysPage}
							color="primary"
							shape="circular"
							onChange={handleWayChange}
						/>
						<p className={styles.warningText}>
							*Might need to refresh to work properly
						</p>
						<Button
							className={styles.changeCoursesBtn}
							onClick={() => setDataSent(false)}
						>
							Change courses
						</Button>
						<a
							href="https://forms.gle/CqVS8yoEFmuJjqVw9"
							target="_blank"
							rel="noreferrer"
						>
							<Button className={styles.feedbackBtn}>Feedback</Button>
						</a>
					</Box>
				) : (
					<AutoSlotForm
						list={inputDropDownData}
						ttDatabase={list}
						receivedData={setpossibleWays}
						setDataState={setDataState}
						dataSentVar={dataSent}
						onToastMessageReceive={onToastMessageReceive}
					/>
				)}
			</Drawer>
			{/* </div> */}

			<div className={styles.container}>
				<div id="timetable" className={styles.timetableDiv}>
					<table className={styles.mainTable}>
						<thead>
							<tr className={styles.headerRow}>
								<td
									className={styles.firstColumn}
									style={{
										backgroundColor: " #428bf9",
										border: "1px solid #070707ff",
										borderRadius: "20px",
										color: "#070707ff",
									}}
								>
									Theory <br />
									Hours
								</td>
								<td className={styles.theoryHours}>
									08:00 AM
									<br />
									08:50 AM
								</td>
								<td className={styles.theoryHours}>
									09:00 AM
									<br />
									09:50 AM
								</td>
								<td className={styles.theoryHours}>
									10:00 AM
									<br />
									10:50 AM
								</td>
								<td className={styles.theoryHours}>
									11:00 AM
									<br />
									11:50 AM
								</td>
								<td className={styles.theoryHours}>
									12:00 PM
									<br />
									12:50 PM
								</td>
								<td className={styles.theoryHours}>
									-----
									<br />
									-----
								</td>
								<td width="8px" rowSpan="9">
									{/* <strong style={{ color: "#000000ff" }}>
											L <br />U <br />N <br />C <br />H
										</strong> */}
								</td>
								<td className={styles.theoryHours}>
									02:00 PM
									<br />
									02:50 PM
								</td>
								<td className={styles.theoryHours}>
									03:00 PM
									<br />
									03:50 PM
								</td>
								<td className={styles.theoryHours}>
									04:00 PM
									<br />
									04:50 PM
								</td>
								<td className={styles.theoryHours}>
									05:00 PM
									<br />
									05:50 PM
								</td>
								<td className={styles.theoryHours}>
									06:00 PM
									<br />
									06:50 PM
								</td>
								<td className={styles.theoryHours}>
									07:00 PM
									<br />
									07:50 PM
								</td>
							</tr>
							<tr className={styles.headerRow}>
								<td
									className={styles.firstColumn}
									style={{
										backgroundColor: "#ff99cc",
										color: "#070707ff",
										border: "1px solid #070707ff",
										borderRadius: "20px",
									}}
								>
									Lab <br />
									Hours
								</td>
								<td className={styles.labHours}>
									08:00 AM
									<br />
									08:50 AM
								</td>
								<td className={styles.labHours}>
									08:51 AM
									<br />
									09:40 AM
								</td>
								<td className={styles.labHours}>
									09:51 AM
									<br />
									10:40 AM
								</td>
								<td className={styles.labHours}>
									10:41 AM
									<br />
									11:30 AM
								</td>
								<td className={styles.labHours}>
									11:40 AM
									<br />
									12:30 PM
								</td>
								<td className={styles.labHours}>
									12:31 PM
									<br />
									01:20 PM
								</td>
								<td className={styles.labHours}>
									02:00 PM
									<br />
									02:50 PM
								</td>
								<td className={styles.labHours}>
									02:51 PM
									<br />
									03:40 PM
								</td>
								<td className={styles.labHours}>
									03:51 PM
									<br />
									04:40 PM
								</td>
								<td className={styles.labHours}>
									04:41 PM
									<br />
									05:30 PM
								</td>
								<td className={styles.labHours}>
									05:40 PM
									<br />
									06:30 PM
								</td>
								<td className={styles.labHours}>
									06:31 PM
									<br />
									07:20 PM
								</td>
							</tr>
						</thead>
						<tbody>
							<tr className={styles.dataRow}>
								<td className={styles.firstColumn}>MON</td>
								{monday?.slice(0, 6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={monday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
								{/* <td className={styles.lunch}></td> */}
								<tr>
									<span style={{ fontSize: "30px" }}>L</span>
								</tr>
								{monday?.slice(6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={monday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
							</tr>
							<tr className={styles.dataRow}>
								<td className={styles.firstColumn}>TUE</td>
								{tuesday?.slice(0, 6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={tuesday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
								{/* <td className={styles.lunch}></td> */}
								<tr>
									<span style={{ fontSize: "30px" }}>U</span>
								</tr>
								{tuesday?.slice(6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={tuesday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
							</tr>

							<tr className={styles.dataRow}>
								<td className={styles.firstColumn}>WED</td>
								{wednesday?.slice(0, 6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={wednesday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
								{/* <td className={styles.lunch}></td> */}
								<tr>
									<span style={{ fontSize: "30px" }}>N</span>
								</tr>
								{wednesday?.slice(6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={wednesday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
							</tr>

							<tr className={styles.dataRow}>
								<td className={styles.firstColumn}>THU</td>
								{thursday?.slice(0, 6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={thursday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
								{/* <td className={styles.lunch}></td> */}
								<tr>
									<span style={{ fontSize: "30px" }}>C</span>
								</tr>
								{thursday?.slice(6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={thursday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
							</tr>

							<tr className={styles.dataRow}>
								<td className={styles.firstColumn}>FRI</td>
								{friday?.slice(0, 6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={friday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
								{/* <td className={styles.lunch}></td> */}
								<tr>
									<span style={{ fontSize: "30px" }}>H</span>
								</tr>
								{friday?.slice(6).map((x) => (
									<Cell
										slot={x.slot}
										currentSlot={currentSlot}
										selected={x.selected}
										day={friday}
										setClashed={setClashed}
										key={x.slot}
										theme={theme}
									/>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			{/* </div> */}
			{/*put here*/}
			<br />
			<hr />
			<br />
			<CourseTable
				currentSlot={currentSlot}
				setCurrentSlot={setCurrentSlot}
				credits={credits}
				setCredits={setCredits}
			/>
			<footer
				className="relative w-full mt-16"
				style={{
					backgroundColor: "var(--background)",
					color: "var(--foreground)",
				}}
			>
				{/* Subtle gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-pink-500/20"></div>

				{/* Content */}
				<div className="relative z-10 py-12 px-8">
					{/* Main Footer Content */}
					<div className="max-w-6xl mx-auto">
						{/* VITrendZ Card */}
						<div className="flex justify-center mb-8">
							<div
								className="backdrop-blur-sm rounded-2xl p-8 border"
								style={{
									backgroundColor: "var(--card)",
									borderColor: "var(--border)",
									color: "var(--card-foreground)",
								}}
							>
								<div className="flex items-center space-x-6">
									{/* Logo */}
									<div className="flex flex-col items-center">
										<div
											className="w-16 h-16 rounded-lg flex items-center justify-center mb-2"
											style={{
												backgroundColor: "var(--primary)",
												color: "var(--primary-foreground)",
											}}
										>
											<img
												src={logo}
												alt="VITrendZ Logo"
												className="w-full h-full object-cover"
											/>
										</div>
										<span className="text-sm font-medium">VITrendZ</span>
									</div>

									{/* Connect Text */}
									<div>
										<h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
										<a
											href="mailto:help@vitrendz.tech"
											className="text-lg underline transition-colors"
											style={{
												color: "var(--primary)",
											}}
										>
											help@vitrendz.tech
										</a>
									</div>
								</div>
							</div>
						</div>

						{/* Services and Community */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
							{/* Services */}
							<div>
								<h4 className="text-xl font-bold mb-4">Services</h4>
								<ul className="space-y-2">
									{["Student Feedback form", "Travel Mate"].map((service) => (
										<li key={service}>
											<a
												href="#"
												className="transition-colors hover:opacity-80"
												style={{
													color: "var(--muted-foreground)",
												}}
											>
												{service}
											</a>
										</li>
									))}
								</ul>
							</div>

							{/* Community */}
							<div>
								<h4 className="text-xl font-bold mb-4">Community</h4>
								<ul className="space-y-2">
									{[
										{
											name: "Instagram",
											href: "https://www.instagram.com/vitrendz/",
										},
										{ name: "Discord", href: "https://discord.gg/qXK5BrCy" },
										{
											name: "Facebook",
											href: "https://www.facebook.com/vitrendz",
										},
										{
											name: "LinkedIn",
											href: "https://www.linkedin.com/company/vitrendz/",
										},
										{ name: "Twitter", href: "https://twitter.com/vitrendz" },
										{
											name: "YouTube",
											href: "https://www.youtube.com/@VITrendz",
										},
									].map((link) => (
										<li key={link.name}>
											<a
												href={link.href}
												target="_blank"
												rel="noreferrer noopener"
												className="transition-colors hover:opacity-80"
												style={{
													color: "var(--muted-foreground)",
												}}
											>
												{link.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Copyright */}
						<div style={{ color: "var(--muted-foreground)" }}>
							<p>&copy;{new Date().getFullYear()} Made with 💙 by VITrendz</p>
						</div>
					</div>

					{/* Help Button */}
					<button
						className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
						style={{
							backgroundColor: "var(--accent)",
							borderColor: "var(--border)",
							color: "var(--accent-foreground)",
						}}
					>
						<span>?</span>
					</button>
				</div>
			</footer>
			{courseAdded | clashed | alreadyAdded ? (
				<Toast type={courseAdded ? "green" : alreadyAdded ? "yellow" : "red"}>
					<h1 style={{ paddingTop: "5px", paddingBottom: "5px" }}>
						{courseAdded
							? "Course added successfully!"
							: clashed
							? `Selected course slots have clashed with ${clashedWith.slot} (${clashedWith.cname})`
							: "You have already added this course!"}
					</h1>
				</Toast>
			) : null}
			{showToast ? (
				<Toast type={"red"}>
					<h1 style={{ paddingTop: "5px", paddingBottom: "5px" }}>
						{toastMessage}
					</h1>
				</Toast>
			) : null}
		</>
	);
}

export default TimeTable;
