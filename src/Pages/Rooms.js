import React from "react";
import HeroSection from "../Components/HeroSection";
import RoomCard from "../Components/RoomCard";
import { useRoomFunctions } from "../Utils/Firebase/firebase";
import SnackBar from "../Components/SnackBar";

function Rooms() {
  const [, { error, rooms, roomsLoading }] = useRoomFunctions();

  const cardsData = rooms;
  console.log("Rooms from the frontend >>", cardsData);
  console.log("Rooms from the api >>", rooms);
  return (
    <div>
      <HeroSection
        title="Rooms"
        image="https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/galleryPage%2FDSC_0930-min.jpg?alt=media&token=12b612ab-3be2-48d6-91a7-17b797b97149"
      />
      <div className="mt-10 container mx-auto relative">
        {roomsLoading && <SnackBar status="Loading" />}
        {error && <SnackBar status="Error" message={error.message} />}
        {/* <div className=""></div> */}
        <div className="h-52 md:h-60 flex  flex-col justify-center items-center before:absolute before:content-[''] before:bg-emerald-50 before:rounded-full before:h-96 before:w-96 before:lg:h-[1200px]  before:lg:w-[1200px] before:-z-10 before:left-1/2 before:top-0 before:transform before:translate-x-[-50%]   ">
          <h5 className="font-sans text-xl text-teal-600 ">Rooms</h5>
          <h1 className=" font-serif text-5xl ">Types of Room</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* col1 */}
          <div className="px-2 md:px-5">
            <RoomCard
              id={cardsData[0]?.id}
              title={cardsData[0]?.title}
              imageUrl={cardsData[0]?.roomImage}
              price={cardsData[0]?.roomPrice}
              roomType={cardsData[0]?.roomType}
            />
            <RoomCard
              id={cardsData[1]?.id}
              title={cardsData[1]?.title}
              imageUrl={cardsData[1]?.roomImage}
              price={cardsData[1]?.roomPrice}
              roomType={cardsData[1]?.roomType}
              small={true}
            />
          </div>
          {/* col 2 */}
          <div className="px-2 md:px-5">
            <RoomCard
              id={cardsData[2]?.id}
              title={cardsData[2]?.title}
              imageUrl={cardsData[2]?.imageUrl}
              price={cardsData[2]?.price}
              roomType={cardsData[2]?.roomType}
              small={true}
            />

            <RoomCard
              id={cardsData[3]?.id}
              title={cardsData[3]?.title}
              imageUrl={cardsData[3]?.imageUrl}
              price={cardsData[3]?.price}
              roomType={cardsData[3]?.roomType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
