import React from "react";
import { useState } from "react";

export default function SnackBar({ status, message }) {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {show && (
        <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-teal-500 text-white  divide-white">
          <div className="flex flex-1 flex-col p-4 border-l-8 dark:border-teal-600">
            <span className="text-2xl">{status}</span>
            <span className="text-xs text-gray-100">{message}</span>
          </div>
          <button
            className="px-4 flex items-center text-xs uppercase tracking-wide text-white border-white"
            onClick={handleClose}
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}
