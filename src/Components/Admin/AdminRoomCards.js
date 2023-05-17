import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRoomDelete } from "../../Utils/Firebase";

export default function AdminRoomCards({ room }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const { deleteRoom } = useRoomDelete();

  const handleRoomDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirm = (id) => {
    deleteRoom(id);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="relative">
      {showConfirm && (
        <div className="absolute  bg-gray-800/80  h-full w-full flex justify-center items-center ">
          <div className="bg-white rounded shadow py-4 px-5 ">
            <p className="text-red-600">Are you sure you want to delete?</p>
            <div className="w-full flex justify-between py-2">
              <button
                className="rounded border border-red-600 hover:bg-red-600 hover:text-white py-2 px-8"
                onClick={() => handleConfirm(room?.id)}
              >
                Yes
              </button>
              <button
                className="rounded border border-gray-600 py-2 px-8"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div class=" sm:my-5 lg:grid lg:grid-cols-5 md:grid-cols-none  lg:bg-white lg:h-full">
        <div class=" px-10 py-10 max-w-md m-auto lg:col-span-2 mt-20 mb-20 shadow-xl rounded-xl lg:mt-10 md:shadow-xl md:rounded-xl lg:shadow-none lg:rounded-none lg:w-full lg:mb-10 lg:px-5 lg:pt-5 lg:pb-5 lg:max-w-lg bg-white">
          <div class="flex justify-between items-center">
            <h1 class="mt-5 font-bold text-lg lg:mt-7">
              {room ? room.roomType : "room Header"}
            </h1>
            <button
              class="px-2 py-1 border border-red-600 text-red-600 font-bold rounded hover:bg-red-500 hover:text-white"
              onClick={handleRoomDelete}
            >
              Delete
            </button>
          </div>

          <h1 class="font-bold text-lg text-teal-600">Ksh {room?.roomPrice}</h1>
          <h1 class="text-lg text-gray-600 text-justify pt-2">
            {room?.roomDescription}
          </h1>
          <button class="mt-5 bg-gray-600 p-3 shadow-2xl rounded-xl text-white font-bold hover:bg-gray-800">
            <Link to={`${room?.id}`}>View Room</Link>
          </button>
        </div>

        <div class="hidden relative lg:block  lg:col-span-3">
          <img
            class="absolute inset-0 w-full h-full object-cover object-center"
            src={room?.roomImage}
            alt="Ad- woman on a beach"
          />
        </div>
      </div>
    </div>
  );
}
