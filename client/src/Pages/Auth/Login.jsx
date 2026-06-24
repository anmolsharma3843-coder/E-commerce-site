import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setUser } from "../../store/authSlice";
import { LoginUser } from "../../services/AuthApiService";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [userlogin, setuserlogin] = useState({
    email: "",
    password: "",
  });

  const [userdata, setuserdata] = useState({});

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
      {/* Header */}
      <div className="flex flex-col justify-start p-4 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-20">
        <Link
          to="/"
          aria-label="Go to homepage"
          className="flex items-center gap-2"
        >
          <div className="w-10 h-8 rounded-full bg-linear-to-r from-purple-700 to-indigo-600 flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src="/logo.svg"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-lg font-bold text-white">
            UrbanMela
          </span>
        </Link>
      </div>

      {/* Main Login Section */}
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Login Card */}
        <div className=" relative z-10 w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 " >
          <h2 className="text-3xl font-bold text-center text-white">
            Welcome Back
          </h2>

          <p className="text-center text-gray-200 mt-2 mb-8">
            Sign in to continue to UrbanMela
          </p>

          <form
            className="space-y-6"
            onSubmit={handleuserlogin}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                value={userlogin.email}
                required
                onChange={(e) =>
                  setuserlogin({
                    ...userlogin,
                    email: e.target.value,
                  })
                }
                placeholder="john@example.com"
                className=" w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 " />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={userlogin.password}
                  onChange={(e) =>
                    setuserlogin({
                      ...userlogin,
                      password: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  className=" w-full px-4 py-3 pr-12 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 " />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors " >
                  {showPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {userdata.message && (
              <div className="text-red-400 text-sm text-center">
                {userdata.message}
              </div>
            )}

            {/* Login Button */}
            <button type="submit" className=" w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition-all duration-300 " >
              Log in
            </button>
          </form>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-200">
            Don’t have an account?{" "}
            <Link
              to="/Signin"
              className="text-white font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;