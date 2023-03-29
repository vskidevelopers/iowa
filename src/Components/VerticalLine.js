import React, { useState, useEffect } from "react";

function VerticalLine() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`flex items-center transition-opacity duration-4000 delay-3000${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-16 border-l-2 border-sky-500 "></div>
    </div>
  );
}

export default VerticalLine;
