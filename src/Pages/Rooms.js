import React from "react";
import HeroSection from "../Components/HeroSection";
import RoomCard from "../Components/RoomCard";

function Rooms() {
  const cardsData = [
    {
      id: 1,
      title: "Room 1",
      imageUrl:
        "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "Ksh 500",
      roomType: "Single Room",
    },
    {
      id: 2,
      title: "Room 2",
      imageUrl:
        "https://images.pexels.com/photos/12970071/pexels-photo-12970071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Description of Room 2",
      price: "Ksh 800",
      roomType: "Double Room",
    },
    {
      id: 3,
      title: "Room 3",
      imageUrl:
        "https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Description of Room 3",
      price: "Ksh 1,000",
      roomType: "Single Room Double Bed",
    },
    {
      id: 4,
      title: "Room 4",
      imageUrl:
        "https://images.pexels.com/photos/8135494/pexels-photo-8135494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Description of Room 4",
      price: "Ksh 1,200",
      roomType: "Duluxe Room",
    },
  ];
  return (
    <div>
      <HeroSection
        title="Rooms"
        image="https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/galleryPage%2FDSC_0930-min.jpg?alt=media&token=12b612ab-3be2-48d6-91a7-17b797b97149"
      />
      <div className="mt-10 container mx-auto relative">
        {/* <div className=""></div> */}
        <div className="h-52 md:h-60 flex  flex-col justify-center items-center before:absolute before:content-[''] before:bg-emerald-50 before:rounded-full before:h-96 before:w-96 before:lg:h-[1200px]  before:lg:w-[1200px] before:-z-10 before:left-1/2 before:top-0 before:transform before:translate-x-[-50%]   ">
          <h5 className="font-sans text-xl text-teal-600 ">Rooms</h5>
          <h1 className=" font-serif text-5xl ">Types of Room</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* col1 */}
          <div className="px-2 md:px-5">
            <RoomCard
              title={cardsData[0].title}
              imageUrl={cardsData[0].imageUrl}
              price={cardsData[0].price}
              roomType={cardsData[0].roomType}
            />
            <RoomCard
              title={cardsData[1].title}
              imageUrl={cardsData[1].imageUrl}
              price={cardsData[1].price}
              roomType={cardsData[1].roomType}
              small={true}
            />
          </div>
          {/* col 2 */}
          <div className="px-2 md:px-5">
            <RoomCard
              title={cardsData[2].title}
              imageUrl={cardsData[2].imageUrl}
              price={cardsData[2].price}
              roomType={cardsData[2].roomType}
              small={true}
            />

            <RoomCard
              title={cardsData[3].title}
              imageUrl={cardsData[3].imageUrl}
              price={cardsData[3].price}
              roomType={cardsData[3].roomType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
