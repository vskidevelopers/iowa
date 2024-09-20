import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/Firebase/firebase";

export default function AdminRoomDetails() {
  const [room, setRoom] = useState({});
  const { roomId } = useParams();
  console.log("roomId >>", roomId);
  useEffect(() => {
    const getRoom = async () => {
      const roomRef = doc(db, "Rooms", roomId);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        setRoom(roomSnap.data());
        console.log("Room Details >>", roomSnap.data());
      } else {
        console.log("No such Room!");
      }
    };

    getRoom();
  }, [roomId]);
  return (
    <div className="md:mt-16 flex h-full w-full justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-600 mb-4">
          {room?.roomType}
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={room?.roomImage}
              alt={room?.roomType}
              className="rounded-lg"
            />
          </div>
          <div className="mt-8 md:mt-0 w-full md:w-1/2">
            <p className="text-teal-600 font-bold">
              Price : Ksh {room?.roomPrice}
            </p>
            <p className="text-gray-600">
              <span className="text-teal-600 font-semibold">Room Beds : </span>{" "}
              {room?.roomBeds}
            </p>
            <p className="mt-4 leading-relaxed">{room?.roomDescription}</p>
            <div className="mt-8 flex items-center">
              <img
                src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                alt=".."
                className="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <p className="text-teal-600 font-bold">Iowa Mangement</p>
                {/* <p className="text-gray-600">{event?.author.bio}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
