import React, { Fragment, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import { Menu, Transition } from "@headlessui/react";
import { useAuthFunctions } from "../../Utils/Firebase/firebase";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuthFunctions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const isAdminUser = localStorage.getItem("isAdmin") === "true";
  console.log("Auth useer >>", user);
  if (!isAdminUser) {
    // Redirect to /clock-in if the user is not an admin
    navigate("/clock-in");
    return null;
  }
  return (
    <div className="flex bg-slate-300 min-h-screen w-full">
      {/* Slidable Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex-shrink-0 w-80 bg-gray-800 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Button */}
        <button
          className="absolute top-0 -right-16 w-16 h-16 flex items-center justify-center bg-teal-600 text-white transition-transform duration-300 transform"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Content */}
      <div
        className={`flex-grow h-full w-full py-5 md:py-10  transition-transform duration-500 px-3 md:px-20 overflow-clip  ${
          isMenuOpen ? "ml-56 md:ml-64" : "ml-0"
        }`}
      >
        <div className=" w-full my-10 flex justify-end items-center">
          <div className="flex items-center gap-4">
            <h1>
              welcome <span className="font-bold ">{user?.email}</span>
            </h1>
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://sxprotection.com.au/wp-content/uploads/2016/07/team-placeholder.png"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/admin"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        // onClick={handleLogout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        {/* Content from React Router */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
