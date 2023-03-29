import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarIcon } from "@heroicons/react/24/solid";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper";

export default function Reviews() {
  return (
    <>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper h-full w-5/6"
      >
        <SwiperSlide>
          <div className="py-20 md:px-28 ">
            <div className="flex justify-center py-3">
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
            </div>
            <div className="text-center my-3">
              <p className="font-serif text-xl md:text-2xl">
                “This place is great! I had a very pleasant stay here. Great
                stuff and beautiful suites with a fabulous view”
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm mt-5 font-medium text-teal-600 uppercase">
                Ben Muchemi, Ke
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-20 md:px-28">
            <div className="flex justify-center py-3">
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
            </div>
            <div className="text-center my-3">
              <p className="font-serif text-xl md:text-2xl ">
                “Been there with my family. Beautiful place, definitely
                recommended. Children also enjoyed it very much”
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm mt-5 font-medium text-teal-600 uppercase">
                {" "}
                Maurice Mwangi, Ke
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-20 md:px-28">
            <div className="flex justify-center py-3">
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
              <StarIcon className="h-4 w-4 text-emerald-900" />
            </div>
            <div className="text-center my-3">
              <p className="font-serif text-xl md:text-2xl">
                “This place is great! I had a very pleasant stay here. Great
                stuff and beautiful suites with a fabulous view”!
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm mt-5 font-medium text-teal-600 uppercase">
                Jane Doe, Ke
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
