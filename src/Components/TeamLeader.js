import React from "react";
import leader from "../Assets/Imgs/leader.png";

export default function TeamLeader() {
  return (
    <div className="py-20 w-full bg-slate 900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div>
          <img src={leader} alt="..." />
        </div>

        <div className="col-span-2">
          <div className="relative flex flex-col justify-center items-center py-10">
            <div className="w-full text-start">
              <h2 className="text-[#FDB715] text-md font-semibold uppercase ">
                Meet the Team Leader
              </h2>
              <div className="w-full md:w-3/4">
                <h1 className="text-3xl font-bold capitalize">
                  Empowering Organizations through Result-Driven Solutions
                </h1>
              </div>
            </div>

            <div className="absolute top-0 left-0 h-full w-full flex justify-end items-baseline opacity-10">
              <h1 className="text-7xl md:text-9xl font-bold">CEO</h1>
            </div>
            <div className="my-5">
              <p>
                I'm Susan Rienye, the CEO of Iowa Eateries Hotel. With a deep
                passion for hospitality, I lead our team to deliver exceptional
                guest experiences and maintain our reputation for excellence. I
                prioritize creating a welcoming atmosphere and ensuring every
                guest's stay is memorable. I actively contribute to the
                community, forging strong partnerships and promoting tourism. As
                a leader, I empower my team, foster a positive work culture, and
                champion sustainable business practices. At Iowa Eateries Hotel,
                we strive to exceed expectations and provide unforgettable
                experiences for our guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
