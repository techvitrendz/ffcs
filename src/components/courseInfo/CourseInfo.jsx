import React from "react";

function CourseInfo(slot) {
  return (
    <tr>
      <td>{slot.selectedSlot.slot}</td>
      <td>Course</td>
      <td>Faculty</td>
      <td>Venue</td>
      <td>Credits</td>
      <td>Clash</td>
    </tr>
  );
}

export default CourseInfo;
