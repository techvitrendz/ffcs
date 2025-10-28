import React, { useState, useEffect, useRef } from "react";
import styles from "./cell.module.css";
import { useStateValue } from "../../context/StateProvider";
function Cell({ slot, currentSlot, selected, theme }) { // ADD theme prop here
	const { state, dispatch } = useStateValue();
	const { monday, tuesday, wednesday, thursday, friday, temp, deletedRow } =
		state;
	const ref = useRef(slot);
	const [selectedSlots, setSelectedSlots] = useState([]);
	const [newArray1, setNewArray1] = useState(monday);
	const [newArray2, setNewArray2] = useState(tuesday);
	const [newArray3, setNewArray3] = useState(wednesday);
	const [newArray4, setNewArray4] = useState(thursday);
	const [newArray5, setNewArray5] = useState(friday);

  const separateSlots = (element) => {
    if (!element) return [];
    const arraySlots = element.split("+");
    return arraySlots;
  };

	 const hasCustomCourse = currentSlot?.some(course => {
    if (course.courseType === 'custom' || course.row.isCustom) {
      const courseSlots = separateSlots(course.row.slot);
      const cellSlots = separateSlots(slot);
      return courseSlots?.some(cs => cellSlots?.includes(cs));
    }
    return false;
  });

	useEffect(() => {
		setNewArray1(monday);
		setNewArray2(tuesday);
		setNewArray3(wednesday);
		setNewArray4(thursday);
		setNewArray5(friday);
	}, [monday, tuesday, wednesday, thursday, friday]);

	useEffect(() => {
		if (deletedRow !== null) {
			let splitValues = separateSlots(deletedRow.slot);
			updatedColors(splitValues, true);
		}
	}, [deletedRow]);

	useEffect(() => {
		if (currentSlot?.length < selectedSlots?.length) {
			setSelectedSlots(temp);
		} else {
			currentSlot.map((course) =>
				setSelectedSlots([...selectedSlots, course.row.slot])
			);
		}
	}, [currentSlot]);

	useEffect(() => {
		isOccupied();
	}, [selectedSlots]);

	const getCellStyle = () => {
    if (hasCustomCourse) {
      // Bright highlight for custom courses
      return {
        backgroundColor: '#ffeb3b', // Bright yellow
        color: '#000000',
        border: '2px solid #ff9800',
        textTransform: 'uppercase',
        borderRadius: '15px',
        fontSize: '0.7rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 0 10px rgba(255, 152, 0, 0.8)'
      };
    } else if (selected) {
      return {
        backgroundColor: theme === 'dark' ? '#2d3748' : '#ffe100ff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        border: theme === 'dark' ? '2px solid #ffffff' : '2px solid #000000',
        textTransform: 'uppercase',
        borderRadius: '15px',
        fontSize: '0.7rem',
        cursor: 'pointer',
        fontWeight: '500'
      };
    } else {
      return {
        backgroundColor: theme === 'dark' ? 'rgba(60, 60, 60, 1)' : 'rgba(255, 255, 255, 1)',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        textTransform: 'uppercase',
        borderRadius: '50px',
        fontSize: '0.7rem',
        cursor: 'pointer',
        fontWeight: '500'
      };
    }
  };
	const isOccupied = () => {
		if (selectedSlots.length) {
			selectedSlots?.map((element) => {
				let splitValues = separateSlots(element);
				updatedColors(splitValues, false);
			});
		}
	};

	const updatedColors = (splitValues, deleteThis) => {
		newArray1?.map((a) => {
			let i = 0;
			for (i = 0; i < splitValues?.length; i++) {
				if (a.splitSlots?.includes(splitValues[i])) {
					a.selected = true;
					updateGlobal1();
				}

				if (a.splitSlots?.includes(splitValues[i]) && deleteThis) {
					a.selected = false;
					updateGlobal1();
					break;
				}
			}
		});

		newArray2?.map((a) => {
			let i = 0;
			for (i = 0; i < splitValues?.length; i++) {
				if (a.splitSlots?.includes(splitValues[i])) {
					a.selected = true;
					updateGlobal2();
				}
				if (a.splitSlots?.includes(splitValues[i]) && deleteThis) {
					a.selected = false;
					updateGlobal2();
					break;
				}
			}
		});

		newArray3?.map((a) => {
			let i = 0;
			for (i = 0; i < splitValues?.length; i++) {
				if (a.splitSlots?.includes(splitValues[i])) {
					a.selected = true;
					updateGlobal3();
				}

				if (a.splitSlots?.includes(splitValues[i]) && deleteThis) {
					a.selected = false;
					updateGlobal3();
					break;
				}
			}
		});

		newArray4?.map((a) => {
			let i = 0;
			for (i = 0; i < splitValues?.length; i++) {
				if (a.splitSlots?.includes(splitValues[i])) {
					a.selected = true;
					updateGlobal4();
				}

				if (a.splitSlots?.includes(splitValues[i]) && deleteThis) {
					a.selected = false;
					updateGlobal4();
					break;
				}
			}
		});

		newArray5?.map((a) => {
			let i = 0;
			for (i = 0; i < splitValues?.length; i++) {
				if (a.splitSlots?.includes(splitValues[i])) {
					a.selected = true;
					updateGlobal5();
				}

				if (a.splitSlots?.includes(splitValues[i]) && deleteThis) {
					a.selected = false;
					updateGlobal5();
					break;
				}
			}
		});
	};

	const updateGlobal1 = () => {
		dispatch({
			type: "UPDATE_ADD1",
			newArray1: newArray1,
		});
	};

	const updateGlobal2 = () => {
		dispatch({
			type: "UPDATE_ADD2",
			newArray2: newArray2,
		});
	};

	const updateGlobal3 = () => {
		dispatch({
			type: "UPDATE_ADD3",
			newArray3: newArray3,
		});
	};

	const updateGlobal4 = () => {
		dispatch({
			type: "UPDATE_ADD4",
			newArray4: newArray4,
		});
	};

	const updateGlobal5 = () => {
		dispatch({
			type: "UPDATE_ADD5",
			newArray5: newArray5,
		});
	};

	return (
    <td
      ref={ref}
      style={getCellStyle()}
      className={styles.ttContent}
    >
      <p>{slot}</p>
      {hasCustomCourse && (
        <div style={{
          fontSize: '0.6rem',
          fontWeight: 'bold',
          color: '#d84315',
          marginTop: '2px'
        }}>
          Custom
        </div>
      )}
    </td>
  );
}

export default Cell;