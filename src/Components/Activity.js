import React from "react";

function Activity({ icon, name, description }) {
  return (
    <div className="block mb-5 md:mb-0 border border-emerald-700  shadow-xl sm:p-4 ">
      <div className="w-full text-emerald-600 flex justify-center md:block my-3">
        {icon}
      </div>

      <h3 className="flex justify-center md:block mt-3 text-lg font-medium text-emerald-600 sm:text-lg">
        {name}
      </h3>
      <p className="text-center mt-4 text-sm text-slate-900 px-2">
        {description}
      </p>
    </div>
  );
}

export default Activity;
