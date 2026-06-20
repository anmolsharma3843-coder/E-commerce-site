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
    nextStep(form);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">

        {/* Main Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold dark:text-white">
            💳 Payment Method
          </h2>

          {/* Payment Options */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`flex-1 p-3 rounded-lg border ${
                method === "card"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              💳 Card
            </button>

            <button
              type="button"
              onClick={() => setMethod("upi")}
              className={`flex-1 p-3 rounded-lg border ${
                method === "upi"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              📱 UPI
            </button>
          </div>

          {/* CARD FORM */}
          {method === "card" && (
            <>
              {/* Card Preview */}
              <div className="bg-[url(https://t3.ftcdn.net/jpg/01/97/84/44/360_F_197844441_Febp1tgrOZtBPJxLIirtYKobhi4j04Z6.jpg)] text-white rounded-xl p-5 shadow-lg">
                <p className="text-sm opacity-80">Card Number</p>
                <h3 className="text-lg tracking-widest">
                  {form.cardNumber || "XXXX XXXX XXXX XXXX"}
                </h3>

                <div className="flex justify-between mt-4 text-sm">
                  <div>
                    <p className="opacity-80">Name</p>
                    <p>{form.name || "Your Name"}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Expiry</p>
                    <p>{form.expiry || "MM/YY"}</p>
                  </div>
                </div>
              </div>

              <input
                name="name"
                placeholder="Card Holder Name"
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
                required
              />

              <input
                name="cardNumber"
                placeholder="Card Number"
                onChange={handleChange}
                maxLength={10}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="expiry"
                  placeholder="MM/YY"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
                  required
                />

                <input
                  name="cvv"
                  placeholder="CVV"
                  type="password"
                  maxLength={4}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </>
          )}

          {/* UPI FORM */}
          {method === "upi" && (
            <input
              name="upi"
              placeholder="Enter UPI ID (example@upi)"
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          )}

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-1/2 bg-gray-400 text-white py-3 rounded-lg md:hover:bg-gray-500 transition"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold md:hover:bg-blue-700 transition"
            >
              Review Order →
            </button>
          </div>

          {/* Security Note */}
          <p className="text-xs text-gray-500 text-center mt-2">
            🔒 Your payment information is securely encrypted
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;