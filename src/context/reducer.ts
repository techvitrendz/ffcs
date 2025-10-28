export const initialState = {
	rowID: [],
	monday: [
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
		{ slot: "", splitSlots: ["", ""], selected: false },
	],

	tuesday: [
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
	],

	wednesday: [
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
	],

	thursday: [
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
	],

	friday: [
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
	],

	temp: [],
	deletedRow: {},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_ROWID":
			return {
				...state,
				rowID: action.rowID,
			};

		case "UPDATE_ADD1":
			return {
				...state,
				monday: action.newArray1,
			};

		case "UPDATE_ADD2":
			return {
				...state,
				tuesday: action.newArray2,
			};

		case "UPDATE_ADD3":
			return {
				...state,
				wednesday: action.newArray3,
			};

		case "UPDATE_ADD4":
			return {
				...state,
				thursday: action.newArray4,
			};

		case "UPDATE_ADD5":
			return {
				...state,
				friday: action.newArray5,
			};

		case "RESET_ALL":
			return {
				...state,
				monday: action.reset1,
				tuesday: action.reset2,
				wednesday: action.reset3,
				thursday: action.reset4,
				friday: action.reset5,
				temp: [],
			};

		case "RESET_TEMP":
			return {
				...state,
				temp: action.newTemp,
			};

		case "DELETE_ROW":
			return {
				...state,
				deletedRow: action.deleteRow,
			};

		default:
			return state;
	}
};

export default reducer;
