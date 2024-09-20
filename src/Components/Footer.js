import React from "react";
import { LogoSvg3 } from "../Utils/Svgs";
import {
  UserIcon,
  HomeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useEmail } from "../Utils/Firebase/firebase";
import { Link } from "react-router-dom";

function Footer({ comingSoon }) {
  const { register, handleSubmit, reset } = useForm();
  const { loading, postEmail } = useEmail();

  const onSubmit = (data) => {
    console.log("Email DATA >>", data);
    postEmail(data);
    alert(
      "We've Recieved your message. We will reach back as soon as possible"
    );
    reset();
  };

  return (
    <div className="w-full bg-slate-900/50">
      <div className="container px-5 md:py-10 md:mx-auto grid md:grid-cols-3 grid-cols-1 gap-6">
        <div className="text-white">
          <LogoSvg3 />
        </div>

        <div className="md:pl-10 flex justify-center flex-col pl-20 md:block">
          <h1 className=" text-md font-medium text-white">Our Contacts</h1>
          <br />
          <ul className=" text-white">
            <Link to="/admin">
              <li className="flex items-center">
                <span>
                  <UserIcon className="h-4 w-4 mr-3" />
                </span>
                Susan Rienye
              </li>
            </Link>
            <li className="flex items-center">
              <span>
                <HomeIcon className="h-4 w-4 mr-3" />
              </span>
              Iowa Eateries, Nanyuki
            </li>
            <li className="flex items-center">
              <span>
                <PhoneIcon className="h-4 w-4 mr-3" />
              </span>
              +254 (0)702 653 080
            </li>

            <li className="flex items-center">
              <span>
                <EnvelopeIcon className="h-4 w-4 mr-3" />
              </span>
              iowa.eateries@gmail.com
            </li>
            <li className="flex items-center">
              <span>
                <GlobeAltIcon className="h-4 w-4 mr-3" />
              </span>
              iowa-eateries.co.ke
            </li>
          </ul>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mb-10 md:mb-5"
          >
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                {...register("name")}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Name"
                type="text"
                id="name"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Email address"
                  type="email"
                  id="email"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  Phone
                </label>
                <input
                  {...register("phone")}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                />
              </div>
            </div>

            <div>
              <label className="sr-only" htmlFor="message">
                Message
              </label>

              <textarea
                {...register("message")}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Enter Your Message"
                rows="3"
                id="message"
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                disabled={loading}
                type="submit"
                className="py-3 w-full px-9  text-white  border border-emerald-400 bg-emerald-400 hover:bg-emerald-800 transition duration-500 ease-in-out -500 font-bold"
              >
                {loading ? "Sending" : "Email Us Today!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
