import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { LoginUser } from "../../services/AuthService";
const SignIn = () => {
  const navigate = useNavigate();
  const [userlogin, setuserlogin] = useState({ email: "", password: "" });
  const [userdata, setuserdata] = useState({});
  const dispatch = useDispatch();
  const handleuserlogin = async (event) => {
    event.preventDefault();

    const response = await LoginUser(userlogin);

    if (response.ok) {
      dispatch(setUser(response.data));

      navigate("/admin");
    } else {
      setuserdata(response.data);
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
            Log In
          </h2>
          <form className="space-y-6" onSubmit={handleuserlogin}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={userlogin.email}
                onChange={(e) =>
                  setuserlogin({ ...userlogin, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={userlogin.password}
                onChange={(e) =>
                  setuserlogin({ ...userlogin, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
              />
            </div>

            {userdata.message && (
              <div className="text-red-400 text-sm">{userdata.message}</div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-lg md:hover:bg-blue-500 transition duration-200"
            >
              Log In
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-100">
            Don’t have an account?{" "}
            <Link to="/Signin" className="text-blue-600 md:hover:underline dark:font-bold dark:text-gray-50">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;