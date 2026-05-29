import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice"; 
import Cookies from "js-cookie";
import { SigninUser } from "../../services/AuthService";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [responseMsg, setResponseMsg] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    try {

      const res = await SigninUser(userdata);
      if (res.ok) {
        dispatch(setUser(res.data));

        // optional: store JWT if backend sets it
        const token = Cookies.get("jwt");

        navigate("/"); // redirect to home
      } else {
        setResponseMsg(data.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setResponseMsg("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start p-5 border-b-2 border-gray-500 bg-white sticky top-0 z-10 dark:bg-gray-800">
               <Link to="/" aria-label="Go to homepage" className="flex items-center gap-2" >
            <div className="w-10 h-auto rounded-full bg-linear-to-r from-purple-700 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
              <img src="/logo.svg" alt="logo" className=" rounded-full object-cover " />
            </div>

            <span className="text-xl font-bold text-gray-900 dark:text-white">
              UrbanMela
            </span>
          </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 dark:bg-gray-600">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-100">
            Create Account
          </h2>

          <form className="space-y-6" onSubmit={handleSignup}>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={userdata.username}
                onChange={(e) => setUserdata({ ...userdata, username: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={userdata.email}
                onChange={(e) => setUserdata({ ...userdata, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={userdata.password}
                onChange={(e) => setUserdata({ ...userdata, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
              />
            </div>

            {responseMsg && (
              <div className="text-red-400 text-sm">{responseMsg}</div>
            )}

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2 rounded border-gray-300 focus:ring-blue-500 dark:text-gray-100" />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-100">
                I agree to the{" "}
                <a href="#" className="text-blue-600 md:hover:underline dark:text-blue-100">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-lg md:hover:bg-blue-500 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-100">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 md:hover:underline dark:text-gray-50 dark:font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
