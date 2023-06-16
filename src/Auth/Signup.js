import React from "react";
import { useAuth } from "./AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { user, signup } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await signup(data.email, data.password);
      console.log("New User >>", user);
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("An error occured >>", error);
    }
  };

  return (
    <div>
      <section class="flex flex-col md:flex-row h-full items-center">
        <div
          class="bg-white w-full md:max-w-md lg:max-w-md md:mx-auto  h-full px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div class="w-full h-100">
            <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
              Create a user
            </h1>

            <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label class="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Email Address"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                />
              </div>

              <div class="mt-4">
                <label class="block text-gray-700">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Create a new user
              </button>
            </form>

            <hr class="my-6 border-gray-300 w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
