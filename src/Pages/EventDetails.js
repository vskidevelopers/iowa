import React, { useEffect, useState } from "react";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import HeroSection from "../Components/HeroSection";
import Calendar from "../Components/Calendar";
import EventDetailTag from "../Components/EventDetailTag";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Utils/Firebase";

function EventDetails() {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getEvent = async () => {
      const eventRef = doc(db, "Events", id);
      const eventSnap = await getDoc(eventRef);
      if (eventSnap.exists()) {
        setEvent(eventSnap.data());
        console.log("eventSnap >>", eventSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getEvent();
  }, [id]);

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
                src={event?.Image}
                alt={event?.Title}
                className="w-full object-cover object-center rounded shadow-md"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-gray-500 text-3xl font-serif mb-4">
                {event?.Title}
              </h2>
              <p>{event?.Description}</p>
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
                subHeading={event?.Start_date}
                icon={<CalendarIcon className="h-3 w-3 text-white" />}
              />
              {/* Location*/}
              <EventDetailTag
                heading="Event Location"
                subHeading={event?.Venue}
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
