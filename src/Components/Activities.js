import React from "react";
import Activity from "./Activity";

import {
  IconBullseyeArrow,
  IconGlassCocktail,
  IconHanger2,
  IconMic,
  IconRestaurantOutline,
} from "../Utils/Svgs";

function Activities() {
  return (
    <div className="container px-5 md:mx-auto w-full  flex flex-wrap md:flex-nowrap md: my-10">
      {/* Activities Right */}
      <div className="w-1/2 flex md: mr-10 items-center">
        <h2 className="text-semibold text-6xl md:text-8xl text-gray-300 font-serif mb-3">
          Activities
        </h2>
      </div>

      {/* Activities Left */}
      <div className=" w-full md:w-1/2 grid grid-col-2  gap-2 md:grid-cols-3 md:gap-4">
        <Activity
          icon={<IconRestaurantOutline />}
          name="Restaurants"
          description="Savor exceptional nyama choma and a dining experience like no other"
        />
        <Activity
          icon={<IconHanger2 />}
          name="Full board"
          description="Escape to luxurious comfort and relaxation with our premium rooms and suites."
        />
        <Activity
          icon={<IconMic />}
          name="Entertainment"
          description="Unwind and indulge in the vibrant nightlife of the Laikipia savannahs, only at Iowa Eateries."
        />
        <Activity
          icon={<IconGlassCocktail />}
          name="Open Bar"
          description="Sip and savor the finest selection of local and international wines and spirits at our world-class bar."
        />
        <Activity
          icon={<IconBullseyeArrow />}
          name="Game Spot"
          description="Have a blast with our exciting selection of games and entertainment options for a fun-filled stay"
        />
      </div>
    </div>
  );
}

export default Activities;
