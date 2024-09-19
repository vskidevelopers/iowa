import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/solid";
import AdminEventCard from "./AdminEventCard";
import { useDropzone } from "react-dropzone";

import SnackBar from "../SnackBar";
import { useForm } from "react-hook-form";
import {
  useAuthFunctions,
  useEventsFunctions,
} from "../../Utils/Firebase/firebase";

function AdminEvents() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm(); // Initialize useForm

  const {
    eventImageURL,
    allEvents,
    eventsSuccess,
    eventsError,
    eventsLoading,
    uploadEventProgress,
    handlePostEvent,
    uploadEventPoster,
  } = useEventsFunctions();

  const { user } = useAuthFunctions();
  console.log("User >>", user);

  console.log("Loading?>>", eventsLoading);

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setValue("imagePoster", file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: handleImageDrop,
  });

  const onSubmit = (data) => {
    console.log("Events Data from Form >>", data);

    if (eventImageURL) {
      console.log("Image Url >>", eventImageURL);
      const eventData = {
        Author: { id: user.uid, email: user.email },
        Title: data.title,
        Start_date: data.startDate,
        End_date: data.endDate,
        Venue: data.venue,
        Description: data.description,
        Image: eventImageURL,
      };
      console.log("Event Data to upload >>", eventData);
      handlePostEvent(eventData);
      alert("We have recieved your request. we'll be in touch shortly");
      reset();
    } else {
      console.log("No Image  ");
      alert("Uploading Files. Click Ok to continue");
      if (data.imagePoster) {
        uploadEventPoster(data.imagePoster);
        console.log("Uploaded Image!!");
      }
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        {/* SnackBar */}
        {eventsLoading && <SnackBar status="Loading" />}
        {eventsError && (
          <SnackBar status="Error" message={eventsError.message} />
        )}
        {eventsSuccess && (
          <SnackBar status="Success" message="Event Added Successfully!" />
        )}
        {/* snackBar end */}
        <div className="flex items-center mb-5">
          <CalendarIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Add a new Event
          </h2>
        </div>
        {/* Add Event Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 md:px-20">
            <div className="grid grid-cols-1 gap-3">
              <label className="block">
                <span className="text-teal-600 font-serif">Event Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  placeholder="Enter the name of the event"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <p className="text-red-500">This field is required</p>
                )}
              </label>
              <div className="flex justify-between">
                <label className="block">
                  <span className="text-teal-600 font-serif">Start Date</span>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    {...register("startDate", { required: true })}
                  />
                  {errors.startDate && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </label>

                <label className="block">
                  <span className="text-teal-600 font-serif">End Date</span>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    {...register("endDate", { required: true })}
                  />
                  {errors.endDate && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </label>

                <label className="block">
                  <span className="text-teal-600 font-serif">Venue</span>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Enter Event's Venue"
                    {...register("venue")}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2 text-teal-600 font-serif"
                  htmlFor="imagePoster"
                >
                  Image Poster:
                </label>
                <div
                  {...getRootProps()}
                  className="border-dashed border border-emerald-600 md:p-2 text-center cursor-pointer"
                >
                  <input {...getInputProps()} type="file" />
                  <p>
                    {getValues("imagePoster")?.name ||
                      "Drag and drop an image here or click to browse"}
                  </p>
                </div>
              </div>

              <label className="block">
                <span className="text-teal-600 font-serif">
                  Event Description
                </span>
                <textarea
                  className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  rows="3"
                  {...register("description")}
                ></textarea>
              </label>

              <div className="block">
                <button
                  type="submit"
                  className="py-5 px-9 text-white bg-emerald-600 md:bg-white border md:text-emerald-600 md:border-emerald-500 md:hover:bg-emerald-600 transition duration-500 ease-in-out md:hover:text-white font-bold"
                >
                  {eventsLoading
                    ? `${uploadEventProgress} % Image uploading ...`
                    : "Submit"}
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
          {allEvents?.map((event) => (
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
