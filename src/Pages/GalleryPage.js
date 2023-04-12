import React, { useEffect, useState } from "react";
import { useFirebaseStorageImages } from "../Utils/Firebase";
import SplashScreen from "../Components/SplashScreen";

function GalleryPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const images = useFirebaseStorageImages();
  console.log("images >>", images);

  let col1 = [];
  let col2 = [];
  let col3 = [];

  for (let i = 0; i < images.length; i += 3) {
    col1.push(images[i]);
  }
  for (let i = 1; i < images.length; i += 3) {
    col2.push(images[i]);
  }
  for (let i = 2; i < images.length; i += 3) {
    col3.push(images[i]);
  }
  console.log("col1 >>", col1);
  console.log("col2 >>", col2);
  console.log("col3 >>", col3);
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    // MASONIC GRID
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* col1 */}
        <div className="flex flex-col">
          {col1.map((image) => (
            <div key={image.id}>
              <img
                loading="lazy"
                src={image.url}
                alt={image.id}
                className="rounded-lg object-cover object-center mb-4"
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
                className="rounded-lg object-cover object-center mb-4"
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
                className="rounded-lg object-cover object-center mb-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
