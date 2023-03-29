import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper";

import Slide1 from "../Assets/Imgs/Slider1.jpg";
import Slide2 from "../Assets/Imgs/Slider2.jpg";
import Slide3 from "../Assets/Imgs/Slider3.jpg";

export default function SwiperComponent() {
  return (
    <>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <img
            className="object-cover w-full h-full"
            src={Slide1}
            alt="slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-full"
            src={Slide2}
            alt="slide 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-full"
            src={Slide3}
            alt="slide 3"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
