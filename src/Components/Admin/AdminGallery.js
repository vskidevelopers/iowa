import AdminGalleryCard from "./AdminGalleryCard";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { useGalleryFunctions } from "../../Utils/Firebase/firebase";
import { useForm } from "react-hook-form";

function AdminGallery() {
  const { handleSubmit, getValues, reset, setValue } = useForm();
  const {
    uploadGalleryImage,
    uploadGalleryImageProgress,
    galleryLoading,

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
      reset();
    }
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
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="imagePoster"
            >
              Image Poster:
            </label>
            <div
              {...getRootProps()}
              className="w-full border border-teal-600 rounded py-2 px-3 cursor-pointer"
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
              className="bg-teal-600 text-white py-2 px-4 rounded"
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
