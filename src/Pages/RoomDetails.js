import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Utils/Firebase";
import HeroSection from "../Components/HeroSection";
import RoomBookingForm from "../Components/RoomBookingForm";

function RoomDetails() {
  const [room, setRoom] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getRoom = async () => {
      const roomRef = doc(db, "Rooms", id);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        setRoom(roomSnap.data());
        console.log("roomSnap >>", roomSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getRoom();
  }, [id]);

  return (
    <div>
      <HeroSection
        title="Room Details"
        image="https://firebasestorage.googleapis.com/v0/b/iowa-a4fe8.appspot.com/o/galleryPage%2FDSC_0930-min.jpg?alt=media&token=12b612ab-3be2-48d6-91a7-17b797b97149"
      />{" "}
      <div className="container mx-auto mt-28 px-2 md:px-20 my-20">
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-3">
          {/* left wing */}
          <div className="px-3 md:col-span-2">
            <div className="w-full h-auto mb-4">
              <img
                src={room?.roomImage}
                alt={room?.roomTitle}
                className="w-full object-cover object-center rounded shadow-md"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-gray-500 text-3xl font-serif mb-4">
                {room?.roomType}
              </h2>
              <h2 className="mt-2 max-w-sm text-md font-semibold text-teal-600">
                {room?.roomPrice ? "Price  : " : ""}
                {room?.roomPrice}
              </h2>
              <p>{room?.roomDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
          </div>
          {/* right wing */}
          <div className="px-3 mt-4 pt-5">
            <div>
              <h2 className="absolute font-bold text-xl text-teal-600 -mt-5 md:-mt-10 pb-3">
                Book This Room
              </h2>
            </div>
            <RoomBookingForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
