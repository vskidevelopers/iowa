import React, { useEffect, useState } from "react";
import { useClockInFunctions } from "../Utils/Firebase";

const ClockIn = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { clockIn, clockOut } = useClockInFunctions();

  useEffect(() => {
    // Get the stored clock-in timestamp from localStorage
    const storedTimestamp = localStorage.getItem("clockInTimestamp");

    if (storedTimestamp) {
      const storedDate = new Date(storedTimestamp);
      const currentDate = new Date();

      // Check if the stored timestamp is from the current day
      if (
        storedDate.getDate() === currentDate.getDate() &&
        storedDate.getMonth() === currentDate.getMonth() &&
        storedDate.getFullYear() === currentDate.getFullYear()
      ) {
        // If it's from the same day, disable the button
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false); // Enable the button if it's a new day
      }
    }
  }, [clockedIn]);

  const handleClockIn = () => {
    setClockedIn(true);
    clockIn();
  };

  const handleClockOut = () => {
    setClockedIn(false);
    clockOut();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Iowa Clock-In System</h1>
        <div className="flex flex-col items-center">
          {clockedIn ? (
            <div className="mb-4">
              <p className="text-green-500 text-xl font-semibold mb-2">
                You are Clocked In
              </p>
              <button
                onClick={handleClockOut}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold disabled:opacity-50"
                disabled={!clockedIn}
              >
                Clock Out
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-500 text-xl font-semibold mb-2">
                You are Clocked Out
              </p>
              <button
                onClick={handleClockIn}
                disabled={isButtonDisabled}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                Clock In
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-8 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Iowa Clock-In System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default ClockIn;
