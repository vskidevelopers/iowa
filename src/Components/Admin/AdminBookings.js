import { BookmarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import AdminBookingsTable from "./AdminBookingsTable";
import { useBookingsFunctions } from "../../Utils/Firebase/firebase";

function AdminBookings() {
  const { bookings, bookingsLoading } = useBookingsFunctions();

  console.log("BOOKINGS >>", bookings);
  console.log("Loading >>", bookingsLoading);

  return (
    <div>
      <div className="flex items-center mb-5">
        <BookmarkIcon className="h-5 w-5 text-teal-600 mr-3" />
        <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
          Review Bookings
        </h2>
      </div>
      {/* Booking Table */}
      <div className="w-full overflow-x-auto">
        <AdminBookingsTable data={bookings} />
      </div>
    </div>
  );
}

export default AdminBookings;
