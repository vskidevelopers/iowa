import React, { useState } from "react";
import AdminGalleryCard from "./AdminGalleryCard";
import { PaperClipIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { useGalleryFunctions } from "../../Utils/Firebase";
import { useForm } from "react-hook-form";

function AdminGallery() {
  const [file, setFile] = useState(null);
  const { handleSubmit, getValues, reset, setValue } = useForm();
  const {
    uploadGalleryImage,
    uploadGalleryImageProgress,
    galleryLoading,
    galleryImageURL,
    images,
  } = useGalleryFunctions();

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
  // const handleFileUpload = async () => {
  //   if (!file) {
  //     console.log("No Selected Image");
  //     return;
  //   } else {
  //     await uploadGalleryImage(file);
  //     console.log("Image Uploaded!");
  //     console.log("Image URL >>", galleryImageURL);
  //   }
  // };

  const onSubmit = (data) => {
    console.log("Data >>", data);
    alert("Uploading Files. Click Ok to continue");
    if (data.imagePoster) {
      uploadGalleryImage(data.imagePoster);
    }
    // if (eventImageURL) {
    //   console.log("Image Url >>", eventImageURL);
    //   const eventData = {
    //     author: data.author,
    //     email: data.email,
    //     phone: data.phoneNumber,
    //     poster: eventImageURL,
    //     description: data.description,
    //     venue: data.venue,
    //     title: data.title,
    //     approved: false,
    //     time: formattedTime,
    //     startDate: data.startdate,
    //     endDate: data.enddate,
    //   };
    //   console.log("service Data to upload >>", eventData);
    //   handlePostUpcomingEvent(eventData);
    //   alert("We have recieved your request. we'll be in touch shortly");
    //   reset();
    // } else {
    //   console.log("No Image  ");
    //   alert("Uploading Files. Click Ok to continue");
    //   if (data.imagePoster) {
    //     uploadUpcomingEventPoster(data.imagePoster);
    //   }
    // }
  };

  return (
    <>
      <div className="bg-white shadow-lg shadow-gray-200 p-4 mt-6 ">
        <div className="flex items-center mb-5">
          <PhotoIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Add a new Image to the Gallery
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div class="px-5 md:px-20">
            <div class="grid grid-cols-1 gap-3">
              <label class="flex items-center gap-10">
                <span class="text-teal-600 font-serif">Gallery Picture</span>
                <div
                  {...getRootProps()}
                  className="border-dashed border border-emerald-600 hover:border-solid hover:border-sky-500 active:bg-violet-700  focus:ring focus:ring-teal-600   md:p-2 text-center flex  items-center h-64 w-64"
                >
                  <input {...getInputProps()} name="image" value={file} />
                  {file ? (
                    <p>{file.name}</p>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <PaperClipIcon className="h-10 w-10 text-teal-600 mb-3" />
                      <p className="text-md">
                        Drag and drop a file or click to upload
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div> */}
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="imagePoster"
            >
              Image Poster:
            </label>
            <div
              {...getRootProps()}
              className="w-full border border-yellow-400 rounded py-2 px-3 cursor-pointer"
            >
              <input {...getInputProps()} type="file" />
              <p>
                {getValues("imagePoster")?.name ||
                  "Drag and drop an image here or click to browse"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-yellow-400 text-white py-2 px-4 rounded"
            >
              {galleryLoading
                ? `${uploadGalleryImageProgress} % Image uploading ...`
                : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-lg shadow-gray-200 p-4 mt-6 grid grid-cols-3 gap-5">
        {images?.map((image, i) => (
          <div key={i}>
            <AdminGalleryCard image={image} i={i} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminGallery;
