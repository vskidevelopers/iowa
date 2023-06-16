import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import SnackBar from "../Components/SnackBar";

export default function Login() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const { login, user } = useAuth();

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log(data);
    try {
      await login(data.email, data.password);
      setSuccessMessage("You have been successfully logged in.");
      console.log("USER >", user);
      navigate("/admin");
    } catch (error) {
      // Handle login error
      console.log("Login error:", error.message);
    }
  };

  return (
    <div className="pt-16">
      <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div class="w-full h-100">
            <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>
            {successMessage && <SnackBar status={successMessage} />}
            {user && <SnackBar status={user.email} />}

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

              <div class="text-right mt-2">
                <Link
                  to=""
                  class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <hr class="my-6 border-gray-300 w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
