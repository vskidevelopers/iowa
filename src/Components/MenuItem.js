import React from "react";

function MenuItem() {
  return (
    <div className="flex">
      {/* image div */}
      <div className="mr-4">
        <img
          className="w-16"
          src="https://duruthemes.com/demo/html/candore/demo1/img/menu/starters/1.jpg"
          alt="starter 1"
        />
      </div>
      {/* title & extra div */}
      <div className="flex-auto">
        {/* top div */}
        <div className="flex">
          {/* title div */}
          <div className="flex-none mr-2">BreakFast Item 1</div>
          <div className="flex-auto border-b-2 border-dashed mr-2"></div>
        </div>

        {/* bottom div */}
        <div className="pt-2 text-sm italic text-emerald-600">
          <h5>extra1, extra 2</h5>
        </div>
      </div>
      {/* price */}
      <div>
        <h5 className="font-serif text-lg italics text-emerald-600">Ksh 500</h5>
      </div>
    </div>
  );
}

export default MenuItem;
