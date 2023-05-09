import React from "react";
import HeroSection from "../Components/HeroSection";
import EventCard from "../Components/EventCard";

function EventList() {
  return (
    <div>
      <HeroSection
        title="Events"
        image="https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/galleryPage%2FDSC_0864-min.jpg?alt=media&token=1f07c2cb-b8b1-4e5f-9412-f43269f91ce1"
      />
      {/* Event List Body */}
      <div className="container mx-auto mt-28 px-20 my-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <EventCard
            id="1"
            date="25 August, 2022"
            title="UEFA SEMI FINALS"
            details="The last Bundesliga club to defeat the Cityzens over two legs were Hamburg in the 2008/09 UEFA Cup quarter-finals. The English side have never lost a Champions League knockout tie to German opponents."
            image="https://img.uefa.com/imgml/stadium/matchinfo/w1/85441.jpg?imwidth=5000"
          />
          <EventCard
            id={2}
            date="25 August, 2022"
            title="UEFA SEMI FINALS"
            details="Inter are expected to name the same starting XI as in the first leg, meaning that Hakan Çalhanoğlu and Lukaku would begin on the bench with Brozović in midfield and Džeko in attack."
            image="https://img.uefa.com/imgml/stadium/matchinfo/w1/57771.jpg?imwidth=5000"
          />
        </div>
      </div>
    </div>
  );
}

export default EventList;
