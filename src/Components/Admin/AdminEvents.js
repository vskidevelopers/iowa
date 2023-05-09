import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import AdminEventCard from "./AdminEventCard";
import { useDropzone } from "react-dropzone";
import {
  useAddEvent,
  useFetchEvents,
  useEventsImageUploader,
} from "../../Utils/Firebase";

function AdminEvents() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    author: "Iowa Management",
    title: "",
    startDate: "",
    endDate: "",
    venue: "",
    description: "",
    image: "",
  });
  const { imageURL, uploadImage } = useEventsImageUploader();

  const { author, title, startDate, endDate, venue, description, image } =
    formData;

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelection,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log("target name", e.target.name, "Target Value ", e.target.value);
  };

  const [addEvent, { loading, error, success }] = useAddEvent();

  const { eventsLoading, events } = useFetchEvents();

  const handleImageUpload = async () => {
    if (!file) {
      console.log("No Image");
      return;
    }
    // console.log("Uploaded Image");

    await uploadImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleImageUpload();
    const eventData = {
      Author: author,
      Title: title,
      Start_date: startDate,
      End_date: endDate,
      Venue: venue,
      Description: description,
      Image: imageURL,
    };
    console.log("eventData >>", eventData);

    addEvent(eventData);

    setFormData({
      author: "",
      title: "",
      startDate: "",
      endDate: "",
      venue: "",
      description: "",
      image: "",
    });
    setFile(null);
  };

  return (
    <div>
      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        <div className="flex items-center mb-5">
          <CalendarIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Add a new Event
          </h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {success && <p>Event added successfully!</p>}
        </div>
        {/* Add Event Form */}
        <form onSubmit={handleSubmit}>
          <div class="px-5 md:px-20">
            <div class="grid grid-cols-1 gap-3">
              <label class="block">
                <span class="text-teal-600 font-serif">Event Name</span>
                <input
                  type="text"
                  class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  placeholder="Enter the name of the event"
                  name="title"
                  value={title}
                  onChange={onChange}
                  required
                />
              </label>
              <div className="flex justify-between">
                <label class="block">
                  <span class="text-teal-600 font-serif">Start Date</span>
                  <input
                    type="date"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    name="startDate"
                    value={startDate}
                    onChange={onChange}
                    required
                  />
                </label>

                <label class="block">
                  <span class="text-teal-600 font-serif">End Date</span>
                  <input
                    type="date"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    name="endDate"
                    value={endDate}
                    onChange={onChange}
                    required
                  />
                </label>

                <label class="block">
                  <span class="text-teal-600 font-serif">Venue</span>
                  <input
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Enter Event's Venue"
                    name="venue"
                    value={venue}
                    onChange={onChange}
                  />
                </label>
              </div>

              <label class="block">
                <span class="text-teal-600 font-serif">Event Picture</span>
                <div
                  {...getRootProps()}
                  className="border-dashed border border-emerald-600 md:p-2 text-center"
                >
                  <input {...getInputProps()} name="image" value={image} />
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
                <span class="text-teal-600 font-serif">Event Description</span>
                <textarea
                  class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  rows="3"
                  name="description"
                  value={description}
                  onChange={onChange}
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

      <div className=" p-4 mt-6">
        <div className="flex items-center mb-5 w-full justify-center">
          <CalendarDaysIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Past Events
          </h2>
          {eventsLoading && <p>Fetching Events. Please Wait...</p>}
        </div>
        <div>
          {events?.map((event) => (
            <div key={event.id}>
              <AdminEventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminEvents;
