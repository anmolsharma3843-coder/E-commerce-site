import { useState } from "react";

const CheckoutPage = ({ nextStep }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(form);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl">

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-5"
        >
          <h2 className="text-2xl font-bold dark:text-white">
            🚚 Delivery Details
          </h2>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <input
            name="address"
            placeholder="Street Address"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            required
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              required
            />

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* CTA */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold md:hover:bg-blue-700 transition">
            Continue to Payment →
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;