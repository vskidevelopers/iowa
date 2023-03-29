import React from "react";

function Newsletter({ comingSoon }) {
  return (
    <div className="bg-rose-50/75">
      <div className="container px-10 md:mx-auto flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 py-10 md:py-20">
          <h1 className="text-semibold text-6xl md:text-7xl text-gray-300 font-serif mb-3">
            {" "}
            Newsletter
          </h1>
        </div>

        <div className="w-full md:w-1/2 pt-5 pb-10 md:py-20 flex items-center">
          <input
            type="email"
            placeholder="Type Your Email... "
            className="border-b border-emerald-400 focus:outline-none focus:border-blue-500 bg-transparent w-3/5 py-4"
          />
          <button
            onClick={comingSoon}
            className="py-3 px-5 md:px-9 ml-3 text-emerald-500  border border-emerald-500 hover:bg-emerald-600 transition duration-500 ease-in-out hover:text-white font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
