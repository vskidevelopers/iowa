// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../Sidebar";

// const AdminDashboard = () => {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar />
//       <div className="flex w-3/5 flex-col flex-1">
//         <main className="flex-1 overflow-y-auto before:absolute before:content-[''] before:bg-emerald-100  before:h-72 before:w-full before:-z-10 before:left-1/2 before:top-0 before:transform before:translate-x-[-50%] ">
//           <div className="mt-10 px-10">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from "../Sidebar";

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isMenuOpen} />
      <div className="flex w-3/5 flex-col flex-1">
        <main className="flex-1 overflow-y-auto">
          <div className="mt-10 px-10">
            <button
              className="menu-button z-10"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-teal-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-teal-600" />
              )}
            </button>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
