import {
  ArrowLeftOnRectangleIcon,
  CakeIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  HomeIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useAuth } from "../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useAuth();
  console.log("CURRENT USER >>", user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("the following error occured during logout", error);
    }
  };

  return (
    <div className="sidebar flex w-max h-full bg-gray-200">
      <div className=" bg-gray-800 text-white h-full w-64">
        <nav className="flex flex-col mt-4 gap-2 px-2">
          <Link
            to="admin-profiles"
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <UserIcon className="h-4 w-4 text-gray-300 mr-2" />
            Profiles
          </Link>
          <Link
            to="admin-events"
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <CalendarDaysIcon className="h-4 w-4 text-gray-300 mr-2" />
            Events
          </Link>
          <Link
            to="admin-bookings"
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <CheckCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
            Bookings
          </Link>
          <Link
            to="admin-gallery"
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <PhotoIcon className="h-4 w-4 text-gray-300 mr-2" />
            Gallery
          </Link>
          <Link
            to="admin-rooms"
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <HomeIcon className="h-4 w-4 text-gray-300 mr-2" />
            Rooms
          </Link>
          <Link
            to="admin-menu"
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <CakeIcon className="h-4 w-4 text-gray-300 mr-2" />
            Menu
          </Link>
          <Link
            to="admin-signup"
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <UserIcon className="h-4 w-4 text-gray-300 mr-2" />
            Create a User
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-600"
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4 text-gray-300 mr-2" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
