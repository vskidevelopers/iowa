import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map() {
  const mapContainerRef = useRef(null);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // console.log("google maps key >>", apiKey);

  useEffect(() => {
    // Create a loader instance
    const loader = new Loader({
      apiKey,
      version: "weekly", // Use the latest version of the Maps JavaScript API
    });

    loader.load().then((google) => {
      const map = new google.maps.Map(mapContainerRef.current, {
        center: { lat: 0.079263, lng: 37.053287 }, // Set your initial coordinates
        zoom: 18, // Set your initial zoom level
      });

      // Create a marker and set its position
      const marker = new google.maps.Marker({
        position: { lat: 0.079263, lng: 37.053287 },
        map, // Specify the map to add the marker to
        title: "Iowa Eateries Mukima", // Tooltip text when you hover over the marker
      });

      console.log("marker >>", marker);

      // You can add additional markers or other map functionality here
    });
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
  );
}

export default Map;
