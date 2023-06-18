import React from "react";
import HeroSection from "../Components/HeroSection";
import ContactTag from "../Components/ContactTag";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useContact } from "../Utils/Firebase";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loading, postContact } = useContact();

  const onSubmit = (data) => {
    console.log(data);
    postContact(data);
    reset();
    alert("We have ecieved your message! We will get back to you Soonest");
  };

  return (
    <div>
      <HeroSection
        title="Contact Us"
        image="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="container mx-auto h-full mt-24 ">
        <div className="relative before:absolute before:content-[''] before:bg-emerald-50 before:rounded-full before:h-96 before:w-96 before:lg:h-[900px]  before:lg:w-[900px] before:-z-10 before:left-1/2 before:top-0 before:transform before:translate-x-[-50%]">
          <h1 className="text-semibold text-4xl md:text-8xl text-gray-300 font-serif mb-3">
            Contact Us:
          </h1>
        </div>

        <div className="flex flex-col md:flex-row mt-5 pb-10">
          {/* left wing */}
          <div className="w-full md:w-1/2 px-5 md:pl-28 ">
            <h2 className="">
              {/* Get in touch with us and let Iowa Eateries be your gateway to
                unforgettable experiences in the wild savannahs of Nanyuki,
                Kenya." */}
              We would love to hear from you! At Iowa Eateries, we are dedicated
              to providing our guests with exceptional service and unforgettable
              experiences in the heart of the Laikipia Savannahs in Nanyuki,
              Kenya. Whether you're interested in booking a stay, learning more
              about our restaurant and bar, or exploring the local area, our
              friendly staff are always here to help. Get in touch with us today
              and let us be your gateway to the adventure and natural beauty of
              the Kenyan wilderness.
            </h2>
            <div className="mt-10 grid gap-5">
              <ContactTag
                icon={<PhoneIcon className="h-3 w-3 text-white" />}
                tagValue="0702 653 080"
                tag="Phone Number"
              />
              <ContactTag
                icon={<EnvelopeIcon className="h-3 w-3 text-white" />}
                tagValue="iowa.eateries@gmail.com"
                tag="Email"
              />
              <ContactTag
                icon={<MapPinIcon className="h-3 w-3 text-white" />}
                tagValue="Mukima,Nanyuki"
                tag="Location"
              />
            </div>
          </div>

          {/* right wing */}
          <div className="mt-10 md:mt-1 w-full md:w-1/2 ">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 md:px-20">
              <div className="grid grid-cols-1 gap-3">
                <label className="block">
                  <span className="text-teal-600 font-serif">Full name</span>
                  <input
                    {...register("fullName", { required: true })}
                    type="text"
                    className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="full name"
                  />
                  {errors.fullName && <span>This field is required</span>}
                </label>
                <label className="block">
                  <span className="text-teal-600 font-serif">
                    Email address
                  </span>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    placeholder="john@example.com"
                  />
                  {errors.email && <span>This field is required</span>}
                </label>
                <label className="block  ">
                  <span className="text-teal-600 font-serif">
                    Select the category of information
                  </span>
                  <select
                    {...register("category")}
                    className="block w-full mt-1 border border-emerald-500 focus:border-1 focus:border-emerald-600"
                  >
                    <option value="Feedback">Feedback</option>
                    <option value="Booking">Booking</option>
                    <option value="Complain">Complain</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-teal-600 font-serif">
                    Additional details
                  </span>
                  <textarea
                    {...register("additionalDetails")}
                    className="mt-1 block w-full border border-emerald-500 focus:border-1 focus:border-emerald-600"
                    rows="3"
                  ></textarea>
                </label>
                <div className="block">
                  <button
                    disabled={loading}
                    type="submit"
                    className="py-5 px-9 text-white bg-emerald-600 md:bg-white border md:text-emerald-600 md:border-emerald-500 md:hover:bg-emerald-600 transition duration-500 ease-in-out md:hover:text-white font-bold"
                  >
                    <p className="uppercase">
                      {loading ? "Submitting" : "Submit"}
                    </p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
