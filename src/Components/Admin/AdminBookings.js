import { BookmarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import AdminBookingsTable from "./AdminBookingsTable";
import { useBookings } from "../../Utils/Firebase";

function AdminBookings() {
  const [, { bookings, loading }] = useBookings();

  console.log("BOOKINGS >>", bookings);
  console.log("Loading >>", loading);

  // data
  const bookingsData = [
    {
      entryNo: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "555-1234",
      roomType: "Standard",
      checkIn: "2022-01-01",
      checkOut: "2022-01-05",
      adults: 2,
      children: 1,
      specialRequirements: "None",
    },
    {
      entryNo: 2,
      firstName: "Jane",
      lastName: "jay",
      email: "janejay@example.com",
      phoneNumber: "555-1234",
      roomType: "Standard",
      checkIn: "2022-01-01",
      checkOut: "2022-01-05",
      adults: 2,
      children: 1,
      specialRequirements: "None",
    },
    // add more bookings here
  ];

  return (
    <div>
      <div className="flex items-center mb-5">
        <BookmarkIcon className="h-5 w-5 text-teal-600 mr-3" />
        <h2 className=" font-medium font-serif text-3xl md:text-2xl text-slate-900 ">
          Review Bookings
        </h2>
      </div>
      {/* Booking Table */}
      <div>
        <AdminBookingsTable data={bookings ? bookings : bookingsData} />
      </div>
    </div>
  );
}

export default AdminBookings;
