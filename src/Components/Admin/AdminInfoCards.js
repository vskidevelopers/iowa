import React from "react";

export default function AdminInfoCards({ title, stats, icon, bgcolor }) {
  return (
    <div className="w-full px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 class="text-blueGray-400 uppercase font-bold text-xs mb-2">
                {title}
              </h5>

              <span class="font-semibold text-xl text-blueGray-700">
                {stats}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                class={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${bgcolor}`}
              >
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
