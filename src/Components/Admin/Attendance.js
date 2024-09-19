import React from "react";

import AttendanceTable from "./AttendanceTable";
import { useClockInFunctions } from "../../Utils/Firebase/firebase";

const Attendance = () => {
  const { clockInReport } = useClockInFunctions();

  return (
    <div>
      <h2>Employee Attendance</h2>
      <AttendanceTable data={clockInReport} />
    </div>
  );
};

export default Attendance;
