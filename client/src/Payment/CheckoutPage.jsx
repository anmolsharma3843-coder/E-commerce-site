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
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Heading */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Delivery Details
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Enter your shipping information
        </p>
      </div>

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Full Name
          </label>

          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="
              w-full
              rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              px-4 py-3
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
            "
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Phone Number
          </label>

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            required
            className="
              w-full
              rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              px-4 py-3
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
            "
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Street Address
        </label>

        <textarea
          name="address"
          rows="3"
          value={form.address}
          onChange={handleChange}
          placeholder="House No, Street, Area"
          required
          className="
            w-full
            rounded-xl
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            px-4 py-3
            text-gray-900 dark:text-white
            focus:outline-none
            focus:ring-2 focus:ring-purple-500
            resize-none
          "
        />
      </div>

      {/* City + Pincode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            City
          </label>

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
            className="
              w-full
              rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              px-4 py-3
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
            "
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Pincode
          </label>

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="123456"
            required
            className="
              w-full
              rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              px-4 py-3
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
            "
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="
          w-full
          sm:w-auto
          bg-purple-600
          hover:bg-purple-700
          text-white
          font-semibold
          px-8 py-3
          rounded-xl
          transition
          shadow-sm
        "
      >
        Continue to Payment →
      </button>
    </form>
  );
};

export default CheckoutPage;