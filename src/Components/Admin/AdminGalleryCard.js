import React, { useState } from "react";
import { useGalleryFunctions } from "../../Utils/Firebase";

export default function AdminGalleryCard({ image, i }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteGalleryImage } = useGalleryFunctions();

  const handleOnDelete = () => {
    setShowConfirm(true);
  };

  const handleOnConfirm = () => {
    deleteGalleryImage(image);
    setShowConfirm(false);
  };

  const handleOnCancel = () => {
    setShowConfirm(false);
  };

  console.log("Image >> ", image);
  return (
    <div className="relative">
      {showConfirm && (
        <div className="absolute z-50  bg-gray-800/80  h-full w-full flex justify-center items-center ">
          <div className="bg-white rounded shadow py-4 px-5 ">
            <p className="text-red-600">Are you sure you want to delete?</p>
            <div className="w-full flex justify-between py-2">
              <button
                className="rounded border border-red-600 hover:bg-red-600 hover:text-white py-2 px-8"
                onClick={() => handleOnConfirm()}
              >
                Yes
              </button>
              <button
                className="rounded border border-gray-600 py-2 px-8"
                onClick={handleOnCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="group  block bg-black">
        <img
          alt={image.id}
          src={image.url}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-500">
            IOWA EATERIES
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">{i}</p>

          <div className="mt-32 sm:mt-48 lg:mt-64">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <button
                onClick={() => handleOnDelete()}
                className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
