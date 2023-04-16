import React from "react";
import Img1 from "../Assets/Imgs/Discovery1.jpg";
import Img2 from "../Assets/Imgs/Discovery2.jpg";
import Img3 from "../Assets/Imgs/Discovery3.jpg";
import { Link } from "react-router-dom";

function DiscoverySection({ comingSoon }) {
  return (
    <div className="container px-5 md:px-1 md:mx-auto md:pt-10 py-5 ">
      <div className="h-16 border-l border-emerald-600 w-full"></div>
      <div>
        <h2 className="text-sm mt-4 font-medium text-teal-600 uppercase">
          This is iowa
        </h2>
        <br />
        <h4 className="font-medium font-serif text-3xl md:text-4xl text-slate-900">
          An Ode to Discovery.
        </h4>
      </div>
      {/* Picture Grid */}
      <div className="container md:mx-auto ">
        <div className="my-10  flex flex-wrap md:grid md:grid-cols-3 md:gap-6 ">
          {/* Image 1 */}
          <div className="h-full w-full flex justify-center items-start flex-col">
            <img src={Img1} alt="Discovery1" className=" w-full md:w-5/6" />
            <div className="relative bottom-12 w-full md:w-5/6 flex justify-center">
              <Link
                to="/gallery"
                className=" rounded-full bg-emerald-700 h-28 w-28 flex justify-center items-center drop-shadow-lg"
              >
                <p className="text-white font-medium ">See More</p>
              </Link>
            </div>
          </div>
          {/* Image 2 */}
          <div className="h-full  w-full flex items-end justify-center">
            <img
              src={Img2}
              alt="Discovery2"
              className="w-full md:w-[95%] pt-1 md:pt-10"
            />
          </div>
          {/* image 3 */}
          <div className="h-full  mt-5 md:mt-1  w-full flex items-start overflow-clip">
            <img src={Img3} alt="Discovery3" className="h-3/5 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverySection;
