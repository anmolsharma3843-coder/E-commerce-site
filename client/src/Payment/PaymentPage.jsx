import { useState } from "react";

const PaymentPage = ({ nextStep, prevStep }) => {
  const [method, setMethod] = useState("card");

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    upi: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    nextStep({
      payment:
        method === "card"
          ? "Credit / Debit Card"
          : method === "upi"
          ? "UPI"
          : "Cash on Delivery",
      ...form,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Heading */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Choose Payment Method
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Select how you'd like to pay
        </p>
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setMethod("card")}
          className={`rounded-xl border p-4 text-sm font-medium transition ${
            method === "card"
              ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          💳 Card
        </button>

        <button
          type="button"
          onClick={() => setMethod("upi")}
          className={`rounded-xl border p-4 text-sm font-medium transition ${
            method === "upi"
              ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          📱 UPI
        </button>

        <button
          type="button"
          onClick={() => setMethod("cod")}
          className={`rounded-xl border p-4 text-sm font-medium transition ${
            method === "cod"
              ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          💵 COD
        </button>
      </div>

      {/* CARD */}
      {method === "card" && (
        <>
          {/* Card Preview */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 shadow-md">
            <p className="text-xs opacity-70 mb-2">
              Credit / Debit Card
            </p>

            <p className="tracking-[3px] text-lg sm:text-xl font-medium">
              {form.cardNumber || "•••• •••• •••• ••••"}
            </p>

            <div className="flex justify-between mt-5">
              <div>
                <p className="text-xs opacity-70">
                  Card Holder
                </p>

                <p className="text-sm">
                  {form.name || "YOUR NAME"}
                </p>
              </div>

              <div>
                <p className="text-xs opacity-70">
                  Expiry
                </p>

                <p className="text-sm">
                  {form.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 dark:text-gray-300">
                Card Holder Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="
                  w-full rounded-xl border
                  border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  px-4 py-3
                  dark:text-white
                  focus:ring-2 focus:ring-purple-500
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block text-sm mb-1 dark:text-gray-300">
                Card Number
              </label>

              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                maxLength={19}
                required
                placeholder="1234 5678 9012 3456"
                className="
                  w-full rounded-xl border
                  border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  px-4 py-3
                  dark:text-white
                  focus:ring-2 focus:ring-purple-500
                  outline-none
                "
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                required
                placeholder="MM/YY"
                className="
                  rounded-xl border
                  border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  px-4 py-3
                  dark:text-white
                  focus:ring-2 focus:ring-purple-500
                  outline-none
                "
              />

              <input
                name="cvv"
                type="password"
                value={form.cvv}
                onChange={handleChange}
                maxLength={4}
                required
                placeholder="CVV"
                className="
                  rounded-xl border
                  border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  px-4 py-3
                  dark:text-white
                  focus:ring-2 focus:ring-purple-500
                  outline-none
                "
              />
            </div>
          </div>
        </>
      )}

      {/* UPI */}
      {method === "upi" && (
        <div>
          <label className="block text-sm mb-1 dark:text-gray-300">
            UPI ID
          </label>

          <input
            name="upi"
            value={form.upi}
            onChange={handleChange}
            required
            placeholder="example@upi"
            className="
              w-full rounded-xl border
              border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              px-4 py-3
              dark:text-white
              focus:ring-2 focus:ring-purple-500
              outline-none
            "
          />
        </div>
      )}

      {/* COD */}
      {method === "cod" && (
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-4">
          <p className="text-sm text-green-700 dark:text-green-400">
            Pay with cash when your order is delivered.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="
            w-full sm:w-auto
            px-6 py-3
            rounded-xl
            bg-gray-200 dark:bg-gray-700
            dark:text-white
            font-medium
          "
        >
          ← Back
        </button>

        <button
          type="submit"
          className="
            w-full sm:flex-1
            bg-purple-600
            hover:bg-purple-700
            text-white
            font-semibold
            py-3
            rounded-xl
            transition
          "
        >
          Review Order →
        </button>
      </div>

      <p className="text-center text-xs text-gray-500">
        🔒 Your payment information is securely encrypted
      </p>
    </form>
  );
};

export default PaymentPage;