import React, { useState } from "react";
import HeroSection from "../Components/HeroSection";
import BookingDetails from "../Components/BookingDetails";
import { useBookingsFunctions } from "../Utils/Firebase/firebase";

export default function Booking() {
  const [handlePostBooking, { bookingSucces, bookingError }] =
    useBookingsFunctions();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    adult: "",
    children: "",
    checkIn: "",
    checkOut: "",
    roomType: "Single Room",
    specialRequirements: "",
  });

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    adult,
    children,
    checkIn,
    checkOut,
    roomType,
    specialRequirements,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log("target name", e.target.name, "Target Value ", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      adult: adult,
      children: children,
      checkIn: checkIn,
      checkOut: checkOut,
      roomType: roomType,
      specialRequirements: specialRequirements,
    };
    console.log("Booking Data >>", bookingData);

    handlePostBooking(bookingData);

    if (bookingSucces) {
      alert(
        "Please note that submitting a booking request does not guarantee a confirmed reservation. Our team will review your details and get in touch with you shortly to finalize your booking. We appreciate your patience and understanding."
      );
    } else if (bookingError) {
      alert(
        "Opps, An error occured. Try submitting the form again after a while"
      );
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      adult: "",
      children: "",
      checkIn: "",
      checkOut: "",
      roomType: "",
      specialRequirements: "",
    });
  };

  return (
    <div>
      {/* hero Section */}
      <HeroSection
        title="Booking Form"
        image="https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      {/* Body Section */}
      <div className="relative before:absolute before:content-[''] before:bg-emerald-50 before:rounded-full before:h-96 before:w-96 before:lg:h-[900px]  before:lg:w-[900px] before:-z-10 before:left-1/2 before:top-0 before:transform before:translate-x-[-50%]"></div>
      <div className="container mx-auto px-10 grid md:grid-cols-3 gap-3 pb-6">
        <div className="mt-16 col-span-2">
          {/* Body Intro Section */}
          <div className="flex flex-col items-center py-10">
            <div className="">
              <h4 className="text-sm pb-5 mt-4 font-medium text-teal-600 uppercase">
                Stay with us
              </h4>
              <h1 className="font-medium font-serif text-3xl md:text-4xl text-slate-900">
                Book Your Room
              </h1>
            </div>
          </div>

          {/* Form Section */}
          <div className="container mx-auto ">
            <form onSubmit={handleSubmit}>
              <div className="grid  md:grid-cols-2 gap-3">
                <label class="block">
                  <span class="text-teal-600 font-serif">First Name</span>
                  <input
                    name="firstName"
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="First Name"
                    value={firstName}
                    onChange={onChange}
                    required
                  />
                </label>

                <label class="block">
                  <span class="text-teal-600 font-serif">Last Name</span>
                  <input
                    name="lastName"
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={onChange}
                    required
                  />
                </label>

                <label class="block">
                  <span class="text-teal-600 font-serif">Email Address</span>
                  <input
                    name="email"
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Email Address"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </label>

                <label class="block">
                  <span class="text-teal-600 font-serif">Phone Number</span>
                  <input
                    name="phoneNumber"
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={onChange}
                  />
                </label>
                <label class="block">
                  <span class="text-teal-600 font-serif">Adult</span>
                  <input
                    name="adult"
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="No. of Adults"
                    value={adult}
                    onChange={onChange}
                  />
                </label>
                <label class="block">
                  <span class="text-teal-600 font-serif">Children</span>
                  <input
                    name="children"
                    type="text"
                    class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="No. of Children"
                    value={children}
                    onChange={onChange}
                  />
                </label>

                <div className="col-span-2 grid  md:grid-cols-3 gap-2">
                  <label class="block">
                    <span class="text-teal-600 font-serif">Check in</span>
                    <input
                      name="checkIn"
                      type="date"
                      class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                      value={checkIn}
                      onChange={onChange}
                      required
                    />
                  </label>

                  <label class="block">
                    <span class="text-teal-600 font-serif">Check out</span>
                    <input
                      name="checkOut"
                      type="date"
                      class="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                      value={checkOut}
                      onChange={onChange}
                      required
                    />
                  </label>

                  <label class="block">
                    <span class="text-teal-600 font-serif">Room Type</span>
                    <select
                      name="roomType"
                      value={roomType}
                      onChange={onChange}
                      required
                      class="block w-full mt-1 border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    >
                      <option>Single Room</option>
                      <option>Single Room Double Bed</option>
                      <option>Double Room</option>
                      <option> Duluxe Room</option>
                    </select>
                  </label>
                </div>
                <label className="col-span-2 block">
                  <span className="text-teal-600 font-serif">
                    Special Requirements
                  </span>
                  <textarea
                    name="specialRequirements"
                    className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    rows="3"
                    value={specialRequirements}
                    onChange={onChange}
                    placeholder=""
                  ></textarea>
                </label>
              </div>
              {/* submit */}
              <button className="mt-3 py-5 px-9 text-white bg-emerald-600 md:bg-white border md:text-emerald-600 md:border-emerald-500 md:hover:bg-emerald-600 transition duration-500 ease-in-out md:hover:text-white font-bold">
                {" "}
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* Booking Details */}
        <div className="col-span-1">
          <BookingDetails />
        </div>
      </div>
    </div>
  );
}
