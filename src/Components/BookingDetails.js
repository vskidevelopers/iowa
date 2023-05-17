import React from "react";

export default function BookingDetails() {
  return (
    <div className=" ml-3 bg-white/80 shadow px-4">
      <h1 className="text-md  mt-4 font-bold text-teal-600 uppercase">
        Booking Details
      </h1>
      {/* heading */}
      <h3>
        Thank you for choosing Iowa Eateries as your preferred destination.
        We're thrilled to assist you in planning a remarkable experience
        tailored to your preferences. To ensure a smooth and seamless booking
        process, we've provided some essential details below
      </h3>

      <h3 className="text-sm  mt-4 font-medium text-teal-600 uppercase">
        Special Requests:{" "}
      </h3>

      <p>
        <span className="font-semibold">Dietary Restrictions:</span> If you or
        any member of your party have specific dietary needs or allergies,
        kindly inform us in advance. Our culinary team will strive to
        accommodate your requirements. <br />
        <span className="font-semibold">Occasion: </span>If you are celebrating
        a special occasion or have any specific preferences, let us know! We'll
        do our best to make your experience extraordinary.{" "}
      </p>
      <h3 className="text-sm  mt-4 font-medium text-teal-600 uppercase">
        Payment{" "}
      </h3>

      <p>
        <span className="font-semibold">Payment Method: </span> Please specify
        your preferred payment method (credit card, cash, mpesa etc.) upon
        arrival. <br />
        <span className="font-semibold">Reservation Deposit: </span> To secure
        your booking, a reservation deposit may be required. Our team will guide
        you through the payment process if applicable.{" "}
      </p>
      <h3 className="text-sm  mt-4 font-medium text-teal-600 uppercase">
        Cancellation Policy:
      </h3>

      <p>
        {" "}
        Should you need to cancel or modify your reservation, kindly notify us
        at least 24 hours in advance. Late cancellations or no-shows may be
        subject to a cancellation fee.
      </p>
    </div>
  );
}
