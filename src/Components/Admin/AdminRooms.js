import { HomeIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import React, { useState } from "react";
import AdminRoomCards from "./AdminRoomCards";
import { useRoomFunctions, useRoomImageUploader } from "../../Utils/Firebase";
import SnackBar from "../SnackBar";

function AdminRooms() {
  const initialRoomsState = {
    roomType: "",
    roomPrice: "",
    roomBeds: " ",
    roomImage: " ",
    roomDescription: "",
  };
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialRoomsState);

  const { roomType, roomPrice, roomBeds, roomDescription } = formData;

  const { postRoomImage, imageURL } = useRoomImageUploader();
  const [addRoom, { loading, error, success, rooms, roomsLoading }] =
    useRoomFunctions();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelection,
  });

  const handleImageUpload = async () => {
    if (!file) {
      console.log("No Image Selected");
      return;
    }
    await postRoomImage(file);
    console.log("Image Uploaded!");
    console.log("Image URL >>", imageURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleImageUpload();

    if (imageURL) {
      console.log("Image Url >> ", imageURL);
      const roomData = {
        roomType: roomType,
        roomPrice: roomPrice,
        roomBeds: roomBeds,
        roomImage: imageURL,
        roomDescription: roomDescription,
      };
      console.log("roomData >>", roomData);

      addRoom(roomData);
      setFormData(initialRoomsState);
      setFile(null);
    } else {
      console.log("No Image  ");
      alert(
        "An error occured during image upload. Try submitting the form again"
      );
    }
  };

  return (
    <div>
      {/* ROOMS ENTRY FORM */}
      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        {/* SnackBar */}
        {loading && <SnackBar status="Loading" />}
        {error && <SnackBar status="Error" message={error.message} />}
        {success && (
          <SnackBar status="Success" message="Event Added Successfully!" />
        )}
        {/* snackBar end */}

        <div className="flex items-center mb-5">
          <HomeIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Add a new Room?
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="px-5 md:px-20">
            <div class="grid grid-cols-1 gap-3">
              <label class="block">
                <span class="text-teal-600 font-serif">Room Name</span>
                <input
                  type="text"
                  class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  placeholder="Enter the Room's name"
                  name="roomType"
                  value={roomType}
                  onChange={handleOnChange}
                  required
                />
              </label>
              <div className="flex justify-between gap-3">
                <label class="block flex-grow ">
                  <span class="text-teal-600 font-serif">Room Price</span>
                  <input
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Ksh 00.00"
                    name="roomPrice"
                    value={roomPrice}
                    onChange={handleOnChange}
                    required
                  />
                </label>

                <label class="block flex-grow">
                  <span class="text-teal-600 font-serif">Beds</span>
                  <input
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="How many Beds does the room have?"
                    name="roomBeds"
                    value={roomBeds}
                    onChange={handleOnChange}
                  />
                </label>
              </div>

              <label class="block">
                <span class="text-teal-600 font-serif">Event Picture</span>
                <div
                  {...getRootProps()}
                  className="border-dashed border border-emerald-600 md:p-2 text-center"
                >
                  <input {...getInputProps()} name="image" />
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
                  name="roomDescription"
                  value={roomDescription}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter room facilities followed by a comma after each room facility"
                ></textarea>
              </label>

              <div className="block">
                <button
                  type="submit"
                  className="py-5 px-9 text-white bg-emerald-600 md:bg-white border md:text-emerald-600 md:border-emerald-500 md:hover:bg-emerald-600 transition duration-500 ease-in-out md:hover:text-white font-bold"
                >
                  <p className="uppercase"> Submit</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ROOMS DISPLAY SECTION */}
      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        {/* SnackBar */}
        {roomsLoading && <SnackBar status="Loading" />}
        {error && <SnackBar status="Error" message={error.message} />}
        {/* snackBar end */}

        <div className="flex items-center mb-5">
          <HomeIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Current Rooms
          </h2>
        </div>
        <div className="divide-y-2 divide-gray-200">
          {rooms?.map((room) => (
            <div key={room.id}>
              <AdminRoomCards room={room} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminRooms;
