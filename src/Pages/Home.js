import React from "react";
import HomeBanner from "../Components/HomeBanner";
import IntroBanner from "../Components/IntroBanner";
import TimeDivider from "../Components/TimeDivider";
import DiscoverySection from "../Components/DiscoverySection";
import Activities from "../Components/Activities";
import Suites from "../Components/Suites";
import Reservation from "../Components/Reservation";

import Reviews from "../Components/Reviews";
import NewsLetter from "../Components/Newsletter";

function Home() {
  const comingSoon = () => {
    alert("This feature is not yet available.");
  };

  return (
    <div>
      <HomeBanner />
      <div className="">
        <div className="md:px-20 xl:px-32  container mx-auto">
          <IntroBanner comingSoon={comingSoon} />
        </div>
      </div>
      <TimeDivider />

      <DiscoverySection comingSoon={comingSoon} />
      <div className="bg-emerald-50 py-8">
        <Activities />
      </div>
      <Suites comingSoon={comingSoon} />
      <Reservation />
      {/* <VideoDivider /> */}
      <Reviews />
      <NewsLetter comingSoon={comingSoon} />
    </div>
  );
}

export default Home;
