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
          description="Lorem ipsum dolor sit amet, in nusquam omittantu."
        />
        <Activity
          icon={<IconMic />}
          name="Entertainment"
          description="Lorem ipsum dolor sit amet, in nusquam omittantu."
        />
        <Activity
          icon={<IconGlassCocktail />}
          name="Open Bar"
          description="Lorem ipsum dolor sit amet, in nusquam omittantu."
        />
        <Activity
          icon={<IconBullseyeArrow />}
          name="Game Spot"
          description="Lorem ipsum dolor sit amet, in nusquam omittantu."
        />
      </div>
    </div>
  );
}

export default Activities;
