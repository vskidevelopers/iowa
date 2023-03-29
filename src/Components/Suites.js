import React from "react";
import SwiperComponent from "./SwiperComponent";

function Suites({ comingSoon }) {
  return (
    <div className="flex flex-wrap container mx-auto my-10 md:my-28 md:flex-nowrap">
      {/* Left Title */}
      <div className="md:w-1/2 px-5 md:mr-10 md:pr-10">
        <div>
          <h1 className="text-semibold text-6xl md:text-8xl text-gray-300 font-serif mb-3">
            Rooms
          </h1>
        </div>

        <div className="container pl-5 md:pl-20 ">
          <div className="h-16 border-l border-emerald-600 w-full"></div>
          <h2 className="text-sm mt-4 font-medium text-teal-600 uppercase">
            This is iowa
          </h2>
          <br />
          <h2 className="font-medium font-serif text-3xl md:text-4xl text-slate-900">
            Luxury Rooms: Your Perfect Getaway
          </h2>
          <br />
          <p>
            Escape to the ultimate indulgence and relaxation at Iowa Eateries'
            luxurious rooms, where every detail is crafted to perfection,
            offering the perfect getaway experience for your next vacation or
            business trip.
          </p>
          <br />
          <div className="mt-6">
            <button
              onClick={comingSoon}
              className="py-3 px-3 text-emerald-500  border border-emerald-500 hover:bg-emerald-600 transition duration-500 ease-in-out hover:text-white font-bold"
            >
              Book a Stay
            </button>
          </div>
        </div>
      </div>

      {/* Right Slider */}
      <div className=" w-full md:w-1/2 flex justify-center items-center py-10 px-5">
        <SwiperComponent />
      </div>
    </div>
  );
}

export default Suites;
