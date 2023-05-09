import { CakeIcon } from "@heroicons/react/24/solid";
import React from "react";
import AdminMenuCard from "./AdminMenuCard";

function AdminMenu() {
  return (
    <div>
      <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mt-6">
        <div className="flex items-center mb-5">
          <CakeIcon className="h-5 w-5 text-teal-600 mr-3" />
          <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
            Add a new Menu Item
          </h2>
        </div>
        <form action="">
          <div class="px-5 md:px-20">
            <div class="grid grid-cols-1 gap-3">
              <label class="block">
                <span class="text-teal-600 font-serif">Item Name</span>
                <input
                  type="text"
                  class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  placeholder="Enter the Item 's name"
                />
              </label>
              <div className="flex justify-between gap-3">
                <label class="block flex-grow ">
                  <span class="text-teal-600 font-serif">Item Price</span>
                  <input
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Ksh 00.00"
                  />
                </label>

                <label class="block  ">
                  <span class="text-teal-600 font-serif">Category</span>
                  <select class="block w-full mt-1 border border-emerald-500 focus:border-1 focus:border-emerald-600">
                    <option>Breakfast</option>
                    <option>Main Course</option>
                    <option>Salads</option>
                    <option>Drinks</option>
                  </select>
                </label>
              </div>
              <label class="block">
                <span class="text-teal-600 font-serif">Extras</span>
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

      {/* Current Menu */}
      <div className="bg-white shadow-lg shadow-gray-200 p-4 mt-6">
        <AdminMenuCard category="Starters" />
        <AdminMenuCard category="Main Course" />
        <AdminMenuCard category="Salads" />
        <AdminMenuCard category="Drinks" />
      </div>
    </div>
  );
}

export default AdminMenu;
