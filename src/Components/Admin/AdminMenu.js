import { CakeIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import AdminMenuCard from "./AdminMenuCard";
import { useDropzone } from "react-dropzone";
import { useMenuFunctions } from "../../Utils/Firebase/firebase";
import SnackBar from "../SnackBar";

function AdminMenu() {
  const [file, setFile] = useState(null);
  const initialFormState = {
    title: "",
    extras: "",
    price: "",
    image: "",
    category: "Breakfast",
  };
  const [formData, setFormData] = useState(initialFormState);
  const { title, extras, price, image, category } = formData;
  const {
    uploadMenuItem,
    handleAddMenuItem,
    imageURL,
    loading,
    error,
    success,
    breakfastMenu,
    mainCourseMenu,
    saladsMenu,
    drinksMenu,
  } = useMenuFunctions();

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelection,
  });

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name, ">>", e.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.log("No image selected");
      return;
    } else {
      await uploadMenuItem(file);
      console.log("Image Uploaded!");
      console.log("Image URL >>", imageURL);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleFileUpload();

    if (imageURL) {
      const menuItemData = {
        title: title,
        price: price,
        extras: extras,
        image: imageURL,
        category: category,
      };
      console.log("menuItemData >>", menuItemData);
      handleAddMenuItem(menuItemData);
      setFormData(initialFormState);
      setFile(null);
    } else {
      alert(
        "An error occured during Image upload. Try submitting the form again. Make sure the Image is still selected "
      );
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        {/* SnackBar */}
        {loading && <SnackBar status="Loading" />}
        {error && <SnackBar status="Error" message={error.message} />}
        {success && (
          <SnackBar status="Success" message="Event Added Successfully!" />
        )}
        {/* snackBar end */}

        <div className="flex items-center mb-5">
          <CakeIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Add a new Menu Item
          </h2>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div class="px-5 md:px-20">
            <div class="grid grid-cols-1 gap-3">
              <label class="block">
                <span class="text-teal-600 font-serif">Item Name</span>
                <input
                  type="text"
                  class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  placeholder="Enter the Item 's name"
                  name="title"
                  value={title}
                  onChange={handleOnchange}
                  required
                />
              </label>
              <div className="flex justify-between gap-3">
                <label class="block flex-grow ">
                  <span class="text-teal-600 font-serif">Item Price</span>
                  <input
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Ksh 00.00"
                    name="price"
                    value={price}
                    onChange={handleOnchange}
                    required
                  />
                </label>

                <label class="block  ">
                  <span class="text-teal-600 font-serif">Category</span>
                  <select
                    name="category"
                    value={category}
                    onChange={handleOnchange}
                    required
                    class="block w-full mt-1 border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  >
                    <option>Breakfast</option>
                    <option>Main Course</option>
                    <option>Salads</option>
                    <option>Drinks</option>
                  </select>
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
                <span class="text-teal-600 font-serif">Extras</span>
                <textarea
                  name="extras"
                  value={extras}
                  onChange={handleOnchange}
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

      {/* Current Menu */}
      <div className="bg-white shadow-lg shadow-gray-200 p-4 mt-6">
        <AdminMenuCard category="Breakfast" menuItems={breakfastMenu} />
        <AdminMenuCard category="Main Course" menuItems={mainCourseMenu} />
        <AdminMenuCard category="Salads" menuItems={saladsMenu} />
        <AdminMenuCard category="Drinks" menuItems={drinksMenu} />
      </div>
    </div>
  );
}

export default AdminMenu;
