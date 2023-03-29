import React, { useEffect } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

import Home from "../Assets/Imgs/Home.jpg";
import { LogoSvg } from "../Utils/Svgs";

function HomeBanner() {
  useEffect(() => {
    const element = document.getElementById("bg-image");

    element.classList.add("animate-zoom-in");

    return () => {
      element.classList.remove("animate-zoom-in");
    };
  }, []);

  return (
    <div className="h-full overflow-clip">
      <div
        id="bg-image"
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${Home})` }}
      ></div>

      {/* <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 "></div> */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute top-2.5   px-4 py-32 sm:px-6 flex w-full justify-center lg:h-screen lg:px-8">
        <div className="text-white ">
          <LogoSvg className="mb-5 " />
          <div className="w-full flex justify-center md:mt-10">
            <h1 className="font-serif uppercase text-md">Scroll For More</h1>
          </div>
          <div className="w-full flex justify-center md:mt-5">
            <ArrowDownCircleIcon className=" animate-bounce h-6 w-6 text-white " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
