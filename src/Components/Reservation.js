import React from "react";

function Reservation() {
  return (
    <div className="bg-emerald-50 py-10 md:py-28">
      <div className="flex justify-center">
        <h1 className="text-semibold text-6xl md:text-8xl text-gray-300 font-serif mb-3">
          Reservation
        </h1>
      </div>
      {/* Comming soon feature */}

      <div className="container px-5 md:mx-auto">
        <div className="flex justify-center items-center py-10">
          <div className=" p-4 md:p-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
              Feature Coming Soon!
            </h1>
            <p className="text-gray-500 text-center">
              We're working hard to bring you this feature. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
