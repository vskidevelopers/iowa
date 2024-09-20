import React from "react";
import HeroSection from "../Components/HeroSection";
import EventCard from "../Components/EventCard";
import { useEventsFunctions } from "../Utils/Firebase/firebase";
import SnackBar from "../Components/SnackBar";

function EventList() {
  const { eventsLoading, allEvents } = useEventsFunctions();

  console.log("EVENTS from event list >>", allEvents);

  return (
    <div>
      <HeroSection
        title="Events"
        image="https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/galleryPage%2FDSC_0864-min.jpg?alt=media&token=1f07c2cb-b8b1-4e5f-9412-f43269f91ce1"
      />
      {/* Event List Body */}
      <div className="container mx-auto mt-28 px-20 my-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {eventsLoading && <SnackBar status="Loading" />}
          {allEvents.map((event, i) => (
            <EventCard
              key={i}
              id={event?.id}
              date={event?.Start_date}
              title={event?.Title}
              details={event?.Description}
              image={event?.Image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventList;
