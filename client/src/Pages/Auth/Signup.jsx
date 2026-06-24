import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Cookies from "js-cookie";
import { SigninUser } from "../../services/AuthApiService";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const res = await SigninUser(userdata);

      if (res.ok) {
        dispatch(setUser(res.data));

        const token = Cookies.get("jwt");

        navigate("/");
      } else {
        setResponseMsg(res.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setResponseMsg("Something went wrong. Try again.");
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

      {/* Background */}
      <div
        className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Signup Card */}
        <div className=" relative z-10 w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 " >
          <h2 className="text-3xl font-bold text-center text-white">
            Create Account
          </h2>

          <p className="text-center text-gray-200 mt-2 mb-3">
            Join UrbanMela and start shopping
          </p>

          <form className="space-y-5" onSubmit={handleSignup}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                required
                value={userdata.username}
                onChange={(e) =>
                  setUserdata({
                    ...userdata,
                    username: e.target.value,
                  })
                }
                className=" w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 " />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                required
                value={userdata.email}
                onChange={(e) =>
                  setUserdata({
                    ...userdata,
                    email: e.target.value,
                  })
                }
                className=" w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 " />
            </div>

            {/* Password */}
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={userdata.password}
                  required
                  onChange={(e) =>
                    setUserdata({
                      ...userdata,
                      password: e.target.value,
                    })
                  }
                  className=" w-full px-4 py-2.5 pr-12 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 " />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors "
                >
                  {showPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="accent-purple-600"
              />

              <label
                htmlFor="terms"
                className="text-sm text-gray-200"
              >
                I agree to the{" "}
                <span className="text-purple-300 hover:underline cursor-pointer">
                  Terms & Conditions
                </span>
              </label>
            </div>

            {/* Error */}
            {responseMsg && (
              <div className="text-red-400 text-sm text-center">
                {responseMsg}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className=" w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition-all duration-300 "
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-3 text-center text-sm text-gray-200">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;