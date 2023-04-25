import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { LogoSvg2 } from "../Utils/Svgs";
export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-20 flex flex-wrap items-center justify-between px-2 py-3 mb-3 w-full shadow ${
          isScrolled ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between ">
          <div className="w-full lg:w-1/5 relative flex lg:static lg:block justify-between">
            <Link className="flex text-emerald-600 items-center" to="/">
              <LogoSvg2 />
              <span className="ml-3 text-md font-normal font-serif ">
                Iowa Eateries
              </span>
            </Link>
            <button
              className="text-teal-600 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Bars3Icon className="text-teal-600 h-6 w-6" />
            </button>
          </div>
          <div className="lg:w-4/5">
            <div
              className={
                "block  lg:grid grid-cols-2" +
                (navbarOpen ? " block" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none text-center md:pr-36  ">
                <li className="nav-item">
                  <Link
                    className=" px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/"
                  >
                    <span className="ml-2">About Us</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/gallery"
                  >
                    <span className="ml-2">Gallery</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/rooms"
                  >
                    <span className="ml-2">Rooms</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/menu"
                  >
                    <span className="ml-2">Menu</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/events"
                  >
                    <span className="ml-2">Events</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col lg:flex-row list-none w-full justify-end">
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/login"
                  >
                    <span className="ml-2">Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase w-max font-bold leading-snug text-teal-500 hover:opacity-75"
                    to="/signup"
                  >
                    <span className="ml-2">Register </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
