import React from "react";
import HeroSection from "../Components/HeroSection";
import FloatingCards from "../Components/FloatingCards";
import { StarIcon, EyeIcon, LightBulbIcon } from "@heroicons/react/24/outline";

import TeamLeader from "../Components/TeamLeader";

function About() {
  const coreValues = [
    "Hospitality",
    "Excellence",
    "Innovation",
    "Teamwork",
    "Sustainability",
  ];
  return (
    <>
      <HeroSection
        tagline="Build On Teamwork"
        title="About us"
        image="https://images.pexels.com/photos/1181415/pexels-photo-1181415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="py-16 relative">
        <div className="container mx-auto px-5 md:px-20">
          <div className="initial md:absolute -top-20 left-10 container">
            <div className=" flex flex-col md:flex-row justify-between gap gap-3">
              <FloatingCards
                basis="basis-1/3"
                title="Our Mission"
                description="Our mission is to create unforgettable moments for our guests by delivering exceptional hospitality, offering diverse and flavorful culinary experiences, and providing a welcoming environment that reflects the warmth and charm of Iowa."
                icon={<StarIcon className="h-8 w-8 text-teal-600 mr-5" />}
              />
              <FloatingCards
                basis="basis-1/3"
                title="Our Vision"
                description="At Iowa Eateries, our vision is to be the premier hospitality destination, known for exceptional service, remarkable experiences, and a commitment to culinary excellence"
                icon={<EyeIcon className="h-8 w-8 text-teal-600 mr-5" />}
              />
              <FloatingCards
                basis="basis-1/3"
                list={true}
                title="Our Core Values"
                description={coreValues}
                icon={<LightBulbIcon className="h-8 w-8 text-teal-600 mr-5" />}
              />
            </div>
          </div>

          <div className="mt-16">
            <TeamLeader />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
