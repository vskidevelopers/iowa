import React from "react";
import HeroSection from "../Components/HeroSection";
import MenuItem from "../Components/MenuItem";
import ParallaxDivider from "../Components/ParallaxDivider";

function Menu() {
  const image =
    "https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/galleryPage%2FDSC_0970-min.jpg?alt=media&token=918aca9b-6464-422a-9ee6-6b830bc74ae7";
  return (
    <div className="bg-emerald-50">
      <HeroSection title="Menu" image={image} />
      <div className="mt-10 pb-10 container mx-auto md:px-10">
        {/* Starters Block */}
        <div>
          {/* title block */}
          <div className="flex justify-center items-center h-48">
            <h1 className="text-gray-500 text-3xl font-serif">Starters</h1>
          </div>
          {/* food-grid block*/}
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {/* menu Item */}
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
          </div>
        </div>
        {/* Main Course */}
        <div>
          {/* title block */}
          <div className="flex justify-center items-center h-48">
            <h1 className="text-gray-500 text-3xl font-serif">Main Courses</h1>
          </div>
          {/* food-grid block*/}
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {/* menu Item */}
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
          </div>
        </div>
        {/* Salads */}
        <div>
          {/* title block */}
          <div className="flex justify-center items-center h-48">
            <h1 className="text-gray-500 text-3xl font-serif">Salads</h1>
          </div>
          {/* food-grid block*/}
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {/* menu Item */}
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
          </div>
        </div>
        {/* Drinks */}
        <div>
          {/* title block */}
          <div className="flex justify-center items-center h-48">
            <h1 className="text-gray-500 text-3xl font-serif">Drinks</h1>
          </div>
          {/* food-grid block*/}
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {/* menu Item */}
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
          </div>
        </div>
      </div>
      <ParallaxDivider />
    </div>
  );
}

export default Menu;
