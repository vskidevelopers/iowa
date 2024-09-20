import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Utils/Firebase/firebase";

export default function AdminEventDetails() {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  useEffect(() => {
    const getEvent = async () => {
      const eventRef = doc(db, "Events", eventId);
      const eventSnap = await getDoc(eventRef);
      if (eventSnap.exists()) {
        setEvent(eventSnap.data());
        console.log("eventSnap >>", eventSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getEvent();
  }, [eventId]);

  return (
    <div className="md:mt-16 flex h-full w-full justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-600 mb-4">
          {event?.Title}
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={
                event?.Image
                  ? event?.Image
                  : "https://img.freepik.com/free-vector/elegant-event-poster-with-black-splash_1361-2193.jpg?w=2000"
              }
              alt={event?.Title}
              className="rounded-lg"
            />
          </div>
          <div className="mt-8 md:mt-0 w-full md:w-1/2">
            <p className="text-teal-600 font-bold">
              {event?.Start_date} - {event?.End_date}
            </p>
            <p className="text-gray-600">{event?.Venue}</p>
            <p className="mt-4 leading-relaxed">{event?.Description}</p>
            <div className="mt-8 flex items-center">
              <img
                src={
                  event?.Author
                    ? "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                alt=".."
                className="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <p className="text-teal-600 font-bold">{event?.Author}</p>
                {/* <p className="text-gray-600">{event?.author.bio}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
