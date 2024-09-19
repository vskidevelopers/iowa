import {
  ArrowLeftOnRectangleIcon,
  CakeIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  HomeIcon,
  PhotoIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React, { Fragment, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthFunctions } from "../Utils/Firebase/firebase";

const Sidebar = () => {
  const [showEventsSubItems, setShowEventsSubItems] = useState(false);
  const [showBookingSubItems, setShowBookingSubItems] = useState(false);
  const [showMenuSubItems, setShowMenuSubItems] = useState(false);
  const [activeSubItem, setActiveSubItem] = useState(null);

  const handleShowSubItems = (itemLabel) => {
    if (itemLabel === "Events") {
      setShowBookingSubItems(false);
      setShowMenuSubItems(false);
      setShowEventsSubItems(!showEventsSubItems);
    } else if (itemLabel === "Bookings") {
      setShowBookingSubItems(!showBookingSubItems);
      setShowMenuSubItems(false);
      setShowEventsSubItems(false);
    } else if (itemLabel === "Menu") {
      setShowBookingSubItems(false);
      setShowMenuSubItems(!showMenuSubItems);
      setShowEventsSubItems(false);
    } else {
      setShowBookingSubItems(false);
      setShowMenuSubItems(false);
      setShowEventsSubItems(false);
    }
  };

  const handleShowBookingLinks = (label) => {
    if (activeSubItem === label) {
      setActiveSubItem(null);
    } else {
      setActiveSubItem(label);
    }
  };

  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     localStorage.clear();
  //     navigate("/", { replace: true });
  //   } catch (error) {
  //     console.log("the following error occured during logout", error);
  //   }
  // };

  const { user, logout } = useAuthFunctions();
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

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: <HomeIcon className="h-4 mr-3 w-auto text-white" />,
      href: "",
    },
    {
      id: 2,
      label: "Profiles",
      icon: <UserCircleIcon className="h-4 mr-3 w-auto text-white" />,
      href: "admin-profiles",
    },
    {
      id: 3,
      label: "Events",
      icon: <CalendarDaysIcon className="h-4 mr-3 w-auto text-white" />,
      href: "admin-events",
      subItems: [
        {
          id: 31,
          label: "All Events",
          href: "admin-events/all",
        },
        {
          id: 32,
          label: "Upcoming Events",
          href: "admin-events/upcoming",
        },
        {
          id: 33,
          label: "Expired Events",
          href: "admin-events/passed",
        },
      ],
    },
    {
      id: 4,
      label: "Bookings",
      icon: <CheckCircleIcon className="h-4 w-auto mr-3 text-white" />,
      href: "admin-bookings",
      subItems: [
        {
          id: 41,
          label: "All Bookings",
          href: "admin-bookings/all",
        },
        {
          id: 42,
          label: "Processed Bookings",
          href: "admin-bookings/processed",
        },
        {
          id: 43,
          label: "Pending Bookings",
          href: "admin-bookings/pending",
        },
        {
          id: 44,
          label: "Rejected Bookings",
          href: "admin-bookings/rejected",
        },
      ],
    },
    {
      id: 5,
      label: "Gallery",
      href: "admin-gallery",
      icon: <PhotoIcon className="h-4 w-auto mr-3 text-white" />,
    },
    {
      id: 6,
      label: "Rooms",
      icon: <HomeIcon className="h-4 w-auto mr-3 text-white" />,
      href: "admin-rooms",
    },
    {
      id: 8,
      label: "Create a User",
      icon: <UserIcon className="h-4 w-auto mr-3 text-white" />,
      href: "admin-signup",
    },
    {
      id: 9,
      label: "Attendance",
      icon: <UserGroupIcon className="h-4 w-auto mr-3 text-white" />,
      href: "admin-attendance",
    },
    {
      id: 7,
      label: "Menu",
      icon: <CakeIcon className="h-4 w-auto mr-3 text-white" />,
      href: "admin-menu",
      subItems: [
        {
          id: 71,
          label: "Breakfast",
          href: "admin-menu/breakfast",
        },
        {
          id: 72,
          label: "Main Course",
          href: "admin-menu/main",
        },
        {
          id: 73,
          label: "Salads",
          href: "admin-menu/salads",
        },
        {
          id: 74,
          label: "Drinks",
          href: "admin-menu/drinks",
        },
      ],
    },
  ];

  return (
    <div className="sidebar bg-gray-800 flex w-full h-full  overflow-y-auto">
      <div className="  text-white h-full w-[90%]">
        <nav className="flex flex-col mt-4 gap-2 px-2">
          {menuItems.map((item) => (
            <Fragment key={item.id}>
              {item.subItems ? (
                <>
                  <Link to={item.href}>
                    <div
                      className="flex items-center py-2 pb-5 border-b border-b-white/30 bg-gray-700/10 hover:bg-gray-900"
                      onClick={() => handleShowSubItems(item.label)}
                    >
                      {item.icon}

                      <span>{item.label}</span>
                    </div>
                  </Link>

                  {showEventsSubItems && item.label === "Events" && (
                    <div className="pl-6 py-2">
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.id}
                          className=" items-center pl-4 py-2 hover:bg-gray-900"
                        >
                          <div
                            onClick={() =>
                              handleShowBookingLinks(subItem.label)
                            }
                            className="w-full h-full "
                          >
                            <Link to={subItem.href} className="w-full">
                              <span>{subItem.label}</span>
                            </Link>
                          </div>
                          {activeSubItem === subItem.label && (
                            <div className="pl-6 py-2">
                              {subItem.subItems.map((linkItem) => (
                                <Link
                                  to={linkItem.href}
                                  key={linkItem.id}
                                  className="flex items-center pl-4 py-2 hover:bg-gray-900"
                                >
                                  <span>{linkItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {showBookingSubItems && item.label === "Bookings" && (
                    <div className="pl-6 py-2">
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.id}
                          className=" items-center pl-4 py-2 hover:bg-gray-900"
                        >
                          <div
                            onClick={() =>
                              handleShowBookingLinks(subItem.label)
                            }
                            className="w-full h-full "
                          >
                            <Link to={subItem.href} className="w-full">
                              <span>{subItem.label}</span>
                            </Link>
                          </div>
                          {activeSubItem === subItem.label && (
                            <div className="pl-6 py-2">
                              {subItem.subItems?.map((linkItem) => (
                                <Link
                                  to={linkItem.href}
                                  key={linkItem.id}
                                  className="flex w-full items-center pl-4 py-2 hover:bg-gray-900"
                                >
                                  <span>{linkItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {showMenuSubItems && item.label === "Menu" && (
                    <div className="pl-6 py-2">
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.id}
                          className=" items-center pl-4 py-2 hover:bg-gray-900"
                        >
                          <div
                            onClick={() =>
                              handleShowBookingLinks(subItem.label)
                            }
                            className="w-full h-full "
                          >
                            <Link to={subItem.href} className="w-full">
                              <span>{subItem.label}</span>
                            </Link>
                          </div>
                          {activeSubItem === subItem.label && (
                            <div className="pl-6 py-2">
                              {subItem.subItems?.map((linkItem) => (
                                <Link
                                  to={linkItem.href}
                                  key={linkItem.id}
                                  className="flex w-full items-center pl-4 py-2 hover:bg-gray-900"
                                >
                                  <span>{linkItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link to={item.href}>
                    <div
                      className="flex items-center py-2 pb-5 border-b border-b-white/30 bg-gray-700/10 hover:bg-gray-900"
                      onClick={() => handleShowSubItems()}
                    >
                      {item.icon}

                      <span>{item.label}</span>
                    </div>
                  </Link>
                </>
              )}
            </Fragment>
          ))}
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
