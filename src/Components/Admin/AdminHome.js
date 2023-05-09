import React from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import AdminInfoCards from "./AdminInfoCards";

function AdminHome() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        <AdminInfoCards
          title="Events"
          stats="3"
          icon={<ChartBarIcon className="h-4 w-4 " />}
          bgcolor="bg-orange-500"
        />
        <AdminInfoCards
          title="Bookings"
          stats="20"
          icon={<CalendarIcon className="h-4 w-4 " />}
          bgcolor="bg-emerald-500"
        />
        <AdminInfoCards
          title="Rooms"
          stats="4"
          icon={<HomeIcon className="h-4 w-4 " />}
          bgcolor="bg-teal-500"
        />
      </div>
    </div>
  );
}

export default AdminHome;
