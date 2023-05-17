import React, { useState } from "react";
import { useMenuFunctions } from "../../Utils/Firebase";

function AdminMenuCard({ category, menuItems }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemId, setItemId] = useState("");
  const { handleDeleteMenuItem } = useMenuFunctions();

  console.log("menuItems", menuItems[0]);

  const handleOnDelete = (id) => {
    setShowConfirm(true);
    setItemId(id);
  };

  const handleOnConfirm = () => {
    console.log("Category >>", category);
    console.log("item Id >>", itemId);
    handleDeleteMenuItem(itemId, category);
    setShowConfirm(false);
  };

  const handleOnCancel = () => {
    setShowConfirm(false);
  };

  console.log("menu Item >>", menuItems);
  return (
    <div className="relative">
      {showConfirm && (
        <div className="absolute  bg-gray-800/80  h-full w-full flex justify-center items-center ">
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

      <div className="my-6">
        <h1 className="text-gray-500 text-3xl font-serif">{category}</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                #
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Extras
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {menuItems?.map((menuItem, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {/* <img src={menuItem?.Image} className="w-12" alt="..." /> */}
                  <div className="w-12 h-12 overflow-hidden">
                    <img
                      src={menuItem?.Image}
                      alt={menuItem?.Title}
                      className="object-contain w-full"
                    />
                  </div>
                </td>
                <td className="whitespace-normal px-4 py-2 font-medium text-gray-900">
                  {menuItem?.Title}
                </td>
                <td className="whitespace-pre-wrap px-4 py-2 text-gray-700">
                  {menuItem?.Extras}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {menuItem?.Price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex justify-between items-center gap-3">
                  <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    View
                  </button>
                  <button
                    onClick={() => handleOnDelete(menuItem?.id)}
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMenuCard;
