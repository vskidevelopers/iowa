import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { IconTray } from "../Utils/Svgs";

function ParallaxDivider() {
  return (
    <header className="relative flex items-center justify-start h-96 mb-12 bg-fixed bg-center bg-cover  custom-img">
      <div className="absolute inset-0 h-full w-full bg-[#181b1c]/75"></div>
      <div className="p-5 text-2xl text-white z-10 ml-5">
        <div className="mb-2 flex">
          <StarIcon className="h-6 w-6 mr-1 text-yellow-500" />
          <StarIcon className="h-6 w-6 mr-1 text-yellow-500" />
          <StarIcon className="h-6 w-6 mr-1 text-yellow-500" />
          <StarIcon className="h-6 w-6 mr-1 text-yellow-500" />
          <StarIcon className="h-6 w-6 mr-1 text-yellow-500" />
        </div>
        <div className="mb-4">
          <h2>
            A modern restaurant with a menu that will make your mouth water.
          </h2>
        </div>
        {/* icon block */}
        <div className="flex">
          <div className="text-yellow-500">
            <IconTray />
          </div>
          <div>
            {/* top div */}
            <div>
              <h3 className="text-lg text-yellow-500">Reservation</h3>
            </div>
            {/* bottom div */}
            <div>
              <h3>0702 653 080</h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ParallaxDivider;
