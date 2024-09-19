import React from "react";
import { useAuth } from "./AuthContext";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { useAuthFunctions } from "../Utils/Firebase/firebase";

export default function Signup() {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const { createUser } = useAuthFunctions();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await createUser(data);
      console.log("New User >>", user);
      reset();
      // navigate("/admin", { replace: true });
    } catch (error) {
      console.error("An error occured >>", error);
    }
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row h-full items-center">
        <div
          className="bg-white w-full md:max-w-md lg:max-w-md md:mx-auto  h-full px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Create a user
            </h1>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  placeholder="Enter Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Admin</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("isAdmin")}
                    className="mr-2"
                  />
                  <span className="text-gray-500">Is this user an admin?</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Create a new user
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
