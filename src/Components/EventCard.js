import React from "react";
import Truncate from "../Utils/Trancate";
import { Link } from "react-router-dom";

function EventCard({ id, date, title, details, image }) {
  const startDate = new Date(date);

  // Define options for formatting the date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Format the date using the options
  const formattedDate = startDate.toLocaleDateString("en-US", options);

  return (
    <div>
      <div className="h-60 w-auto overflow-hidden object-cover object-center rounded ">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="relative px-4 -mt-16  ">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline ">
            <h2 className="text-teal-600 font-semibold tracking-wider">
              {formattedDate}
            </h2>
          </div>

          <h4 className="mt-1 text-md font-semibold uppercase leading-tight truncate">
            {title}
          </h4>

          <div className="mt-3 h-28 overflow-hidden  ">
            <Truncate str={details} n="75" />{" "}
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
