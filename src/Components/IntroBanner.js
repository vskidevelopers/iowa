import React from "react";

import VerticalLine from "./VerticalLine";

function IntroBanner({ comingSoon }) {
  return (
    <div className="py-12 xl:px-24 px-3 ">
      <div className="h-1/5 w-full ">
        <div className="flex justify-center">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <VerticalLine />
            <h2 className="text-sm mt-5 font-medium text-teal-600 uppercase">
              This is iowa
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center flex-col xl:px-36">
        <h1 className="text-3xl text-center text-slate-900 leading-10 font-medium font-serif  my-5">
          Experience Authentic African Hospitality at Iowa Eateries
        </h1>
        <p className="py-5 text-center font-san">
          Welcome to Iowa Eateries, located in the heart of the Laikipia
          Savannahs in Nanyuki, Kenya. Our hotel offers exceptional hospitality,
          delicious food, and exciting entertainment for guests looking to
          experience authentic African hospitality. With comfortable guest
          rooms, world-class amenities, and a vibrant restaurant, bar, and club,
          Iowa Eateries is the perfect destination for your next adventure in
          Kenya.
        </p>
      </div>

      <div className="flex justify-center py-5">
        <button
          onClick={comingSoon}
          className="py-5 px-9 text-white bg-emerald-600 md:bg-white border md:text-emerald-600 md:border-emerald-500 md:hover:bg-emerald-600 transition duration-500 ease-in-out md:hover:text-white font-bold"
        >
          <p> Discover More</p>
        </button>
      </div>
    </div>
  );
}

export default IntroBanner;
