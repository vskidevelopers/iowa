import React, { useState } from "react";
import AdminGalleryCard from "./AdminGalleryCard";
import { PaperClipIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { useGalleryFunctions } from "../../Utils/Firebase";

function AdminGallery() {
  const [file, setFile] = useState(null);
  const { addGalleryImage, imageURL, images } = useGalleryFunctions();

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelection,
  });

  const handleFileUpload = async () => {
    if (!file) {
      console.log("No Selected Image");
      return;
    } else {
      await addGalleryImage(file);
      console.log("Image Uploaded!");
      console.log("Image URL >>", imageURL);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleFileUpload();
    setFile(null);
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
        <form onSubmit={handleOnSubmit}>
          <div class="px-5 md:px-20">
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
