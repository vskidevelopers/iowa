import React from "react";

function EventDetailTag({ heading, subHeading, icon }) {
  return (
    <div className="bg-emerald-50 py-4 px-4 flex ">
      <div className="bg-emerald-700 rounded-full p-4 mr-2 h-6 w-6">{icon}</div>
      <div className="flex-col">
        <h2 className="text-sm font-medium text-teal-600 uppercase">
          {heading}
        </h2>
        <p className="text-sm font-light uppercase">{subHeading}</p>
      </div>
    </div>
  );
}

export default EventDetailTag;
