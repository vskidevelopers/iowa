import React, { useState } from "react";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import HeroSection from "../Components/HeroSection";
import Calendar from "../Components/Calendar";
import EventDetailTag from "../Components/EventDetailTag";

function EventDetails() {
  const [image] = useState(
    "https://img.uefa.com/imgml/stadium/matchinfo/w1/85441.jpg?imwidth=5000"
  );
  const [title] = useState("Man City and Bayern Clash at Munich");
  return (
    <div>
      <HeroSection
        title="Event Details"
        image="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />{" "}
      <div className="container mx-auto mt-28 px-2 md:px-20 my-20">
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-3">
          {/* left wing */}
          <div className="px-3 md:col-span-2">
            <div className="w-full h-auto mb-4">
              <img
                src={image}
                alt={title}
                className="w-full object-cover object-center rounded shadow-md"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-gray-500 text-3xl font-serif mb-4">
                {title}
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                modi excepturi hic ratione, iste doloremque quam assumenda in
                distinctio officiis! Molestias fuga minima fugiat. Tenetur nobis
                quaerat eum veniam quidem?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Time */}
              <EventDetailTag
                heading="Event Time"
                subHeading="12:00"
                icon={<ClockIcon className="h-3 w-3 text-white" />}
              />
              {/* Date */}
              <EventDetailTag
                heading="Event Date"
                subHeading="25 DECEMBER, 2022"
                icon={<CalendarIcon className="h-3 w-3 text-white" />}
              />
              {/* Location*/}
              <EventDetailTag
                heading="Event Location"
                subHeading="Bar Area"
                icon={<MapPinIcon className="h-3 w-3 text-white" />}
              />
            </div>
          </div>
          {/* right wing */}
          <div className="px-3 mt-4">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
