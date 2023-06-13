import React from "react";

function MenuItem({ item }) {
  return (
    <div className="flex">
      {/* image div */}
      <div className="mr-4">
        <div className="w-12 h-12  overflow-hidden">
          <img className="w-16" src={item?.Image} alt={item?.Title} />
        </div>
      </div>
      {/* title & extra div */}
      <div className="flex-auto">
        {/* top div */}
        <div className="flex">
          {/* title div */}
          <div className="flex-none mr-2">{item?.Title}</div>
          <div className="flex-auto border-b-2 border-dashed mr-2"></div>
        </div>

        {/* bottom div */}
        <div className="pt-2 text-sm italic text-emerald-600">
          <h5>{item?.Extras}</h5>
        </div>
      </div>
      {/* price */}
      <div>
        <h5 className="font-serif text-lg italics text-emerald-600">
          {item?.Price}
        </h5>
      </div>
    </div>
  );
}

export default MenuItem;
