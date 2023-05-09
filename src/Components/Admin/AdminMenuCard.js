import React from "react";

function AdminMenuCard({ category }) {
  return (
    <div>
      <div className="my-6">
        <h1 className="text-gray-500 text-3xl font-serif">{category}</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Extras
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $120,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                  View
                </button>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Jane Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                04/11/1980
              </td>

              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $100,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                  View
                </button>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Gary Barlow
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $20,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMenuCard;
