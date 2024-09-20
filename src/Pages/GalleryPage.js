import React, { useEffect, useState } from "react";
import { useGalleryFunctions } from "../Utils/Firebase/firebase";
import SplashScreen from "../Components/SplashScreen";

import HeroSection from "../Components/HeroSection";

function GalleryPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const { allGalleryImages } = useGalleryFunctions();
  console.log("images >>", allGalleryImages);

  let col1 = [];
  let col2 = [];
  let col3 = [];

  for (let i = 0; i < allGalleryImages.length; i += 3) {
    col1.push(allGalleryImages[i]);
  }
  for (let i = 1; i < allGalleryImages.length; i += 3) {
    col2.push(allGalleryImages[i]);
  }
  for (let i = 2; i < allGalleryImages.length; i += 3) {
    col3.push(allGalleryImages[i]);
  }
  console.log("col1 >>", col1);
  console.log("col2 >>", col2);
  console.log("col3 >>", col3);
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="Gallery"
        image="https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/galleryPage%2FDSC_0902-min.jpg?alt=media&token=68fe039d-157d-4c8c-aa06-75ea42f938ce"
      />
      {/*  MASONIC GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* col1 */}
          <div className="flex flex-col">
            {col1.map((image) => (
              <div key={image.id}>
                <img
                  loading="lazy"
                  src={image.url}
                  alt={image.id}
                  className="rounded object-cover object-center mb-4"
                />
              </div>
            ))}
          </div>
          {/* col 2 */}
          <div className="flex flex-col ">
            {col2.map((image) => (
              <div key={image.id}>
                <img
                  src={image.url}
                  alt={image.id}
                  className="rounded object-cover object-center mb-4"
                />
              </div>
            ))}
          </div>
          {/* col3 */}
          <div className="flex flex-col">
            {col3.map((image) => (
              <div key={image.id}>
                <img
                  src={image.url}
                  alt={image.id}
                  className="rounded object-cover object-center mb-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
