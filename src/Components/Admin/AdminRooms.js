import { HomeIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import React, { useState } from "react";
import AdminRoomCards from "./AdminRoomCards";

function AdminRooms() {
  const [file, setFile] = useState(null);

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelection,
  });

  return (
    <div>
      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        <div className="flex items-center mb-5">
          <HomeIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Add a new Room?
          </h2>
        </div>
        <form action="">
          <div class="px-5 md:px-20">
            <div class="grid grid-cols-1 gap-3">
              <label class="block">
                <span class="text-teal-600 font-serif">Room Name</span>
                <input
                  type="text"
                  class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  placeholder="Enter the Room's name"
                />
              </label>
              <div className="flex justify-between gap-3">
                <label class="block flex-grow ">
                  <span class="text-teal-600 font-serif">Room Price</span>
                  <input
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Ksh 00.00"
                  />
                </label>

                <label class="block flex-grow">
                  <span class="text-teal-600 font-serif">Beds</span>
                  <input
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="How many Beds does the room have?"
                  />
                </label>
              </div>

              <label class="block">
                <span class="text-teal-600 font-serif">Room Picture</span>
                <div
                  {...getRootProps()}
                  className="border-dashed border border-emerald-600 md:p-2 text-center"
                >
                  <input {...getInputProps()} />
                  {file ? (
                    <p>{file.name}</p>
                  ) : (
                    <div>
                      <p className="text-sm">
                        Drag and drop a file or click to upload
                      </p>
                    </div>
                  )}
                </div>
              </label>

              <label class="block">
                <span class="text-teal-600 font-serif">Room Description</span>
                <textarea
                  class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  rows="3"
                ></textarea>
              </label>

              <div className="block">
                <button className="py-5 px-9 text-white bg-emerald-600 md:bg-white border md:text-emerald-600 md:border-emerald-500 md:hover:bg-emerald-600 transition duration-500 ease-in-out md:hover:text-white font-bold">
                  <p className="uppercase"> Submit</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        <div className="flex items-center mb-5">
          <HomeIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Current Rooms
          </h2>
        </div>
        <div className="divide-y-2 divide-gray-200">
          <AdminRoomCards />
          <AdminRoomCards />
          <AdminRoomCards />
          <AdminRoomCards />
        </div>
      </div>
    </div>
  );
}

export default AdminRooms;
