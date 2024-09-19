import React, { useEffect } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

import Home from "../Assets/Imgs/Home.jpg";
import { LogoSvg } from "../Utils/Svgs";

function HomeBanner() {
  // useEffect(() => {
  //   const element = document.getElementById("bg-image");

  //   element.classList.add("animate-zoom-in");

  //   return () => {
  //     element.classList.remove("animate-zoom-in");
  //   };
  // }, []);

  return (
    <div className="h-full overflow-clip relative">
      <video
        className="object-cover w-full h-screen"
        autoPlay
        loop
        muted
        playsInline
        preload="auto" // This ensures the video is preloaded for faster start
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/Videos%2Fadvert_web.mp4?alt=media&token=9129a736-49f0-47d7-8fd0-5e422b23285f"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay and content */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute top-2.5 px-4 py-32 sm:px-6 flex w-full justify-center lg:h-screen lg:px-8">
        <div className="text-white mt-5">
          <LogoSvg className="mb-5" />
          <div className="w-full flex justify-center mt-10">
            <h1 className="font-serif uppercase text-md">Scroll For More</h1>
          </div>
          <div className="w-full flex justify-center mt-5">
            <ArrowDownCircleIcon className="animate-bounce h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
