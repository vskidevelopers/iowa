import React from "react";
import Truncate from "../Utils/Trancate";
import { Link } from "react-router-dom";

function EventCard({ id, date, title, details, image }) {
  return (
    <div>
      <img
        src={image}
        alt={title}
        className="w-full object-cover object-center rounded shadow-md"
      />

      <div className="relative px-4 -mt-16  ">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline ">
            <h2 className="text-teal-600 font-semibold tracking-wider">
              {date}
            </h2>
          </div>

          <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
            {title}
          </h4>

          <div className="mt-3">
            <Truncate str={details} n="100" />{" "}
            <Link to={`/events/${id}`}>
              <strong>Read More </strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
