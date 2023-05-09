import React, { useState } from "react";
import { Link } from "react-router-dom";
import Truncate from "../../Utils/Trancate";
import { useDeleteEvents } from "../../Utils/Firebase";

export default function AdminEventCard({ event }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const { deleteEvent } = useDeleteEvents();

  const handleEventDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirm = (id) => {
    deleteEvent(id);
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
                onClick={() => handleConfirm(event?.id)}
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
      <div class="max-w-4xl px-10 my-10 py-6 bg-white shadow">
        <div class="flex justify-between items-center">
          <span class="font-light text-gray-600">{event?.Start_date}</span>
          <button
            class="px-2 py-1 border border-red-600 text-red-600 font-bold rounded hover:bg-red-500 hover:text-white"
            onClick={handleEventDelete}
          >
            Delete
          </button>
        </div>
        <div class="mt-2">
          <Link
            class="text-2xl text-gray-700 font-bold hover:text-gray-600"
            to="/"
          >
            {event?.Title}
          </Link>
          <p class="mt-2 text-gray-600">
            <Truncate str={event?.Description} n="300" />{" "}
            <Link
              class="text-gray-500 font-semibold hover:text-gray-700 "
              to={`${event?.id}`}
            >
              Read more
            </Link>
          </p>
        </div>
        <div class="flex justify-end items-center mt-4">
          <div>
            <Link class="flex items-center" to="">
              <img
                class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                alt="avatar"
              />
              <h1 class="text-gray-700 font-bold">{event?.Author}</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
