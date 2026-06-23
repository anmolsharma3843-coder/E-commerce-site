import React, { useEffect, useState } from "react";
import CheckoutPage from "../Payment/CheckoutPage";
import PaymentPage from "../Payment/PaymentPage";
import ReviewPage from "../Payment/ReviewPage";
import StepIndicator from "../Payment/StepIndicator";
import { getCart } from "../services/Cartitems";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const CheckoutFlow = () => {
  const [step, setStep] = useState(1);
  const [cartitem, setCartitem] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartitem(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const finalItems = buyNowItem ? [buyNowItem] : cartitem;

  const nextStep = (data) => {
    setOrderData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const total = finalItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* STEP INDICATOR */}
        <div className="mb-6">
          <StepIndicator step={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-5">

            {/* ADDRESS */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-base sm:text-lg dark:text-white">
                  1. Delivery Address
                </h2>

                {step > 1 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-purple-600 font-medium text-sm"
                  >
                    Change
                  </button>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <CheckoutPage nextStep={nextStep} />
                  ) : (
                    <p className="text-sm dark:text-gray-300">
                      {orderData.address || "Saved Address"}
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-base sm:text-lg dark:text-white">
                  2. Payment Method
                </h2>

                {step > 2 && (
                  <button
                    onClick={() => setStep(2)}
                    className="text-purple-600 font-medium text-sm"
                  >
                    Change
                  </button>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  {step === 2 ? (
                    <PaymentPage
                      nextStep={nextStep}
                      prevStep={prevStep}
                    />
                  ) : step > 2 ? (
                    <p className="text-sm dark:text-gray-300">
                      {orderData.payment || "Payment Selected"}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Complete address step first
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* REVIEW */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-base sm:text-lg dark:text-white">
                  3. Review Order
                </h2>
              </div>

              <div className="p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  {step === 3 ? (
                    <ReviewPage
                      orderData={orderData}
                      prevStep={prevStep}
                      buyNow={!!buyNowItem}
                    />
                  ) : (
                    <p className="text-sm text-gray-400">
                      Complete payment step first
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">

              <h3 className="text-lg font-semibold dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 max-h-72 overflow-y-auto">
                {finalItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2 dark:text-white">
                        {item.title}
                      </p>

                      <p className="text-xs text-gray-500">
                        Qty: {item.qty}
                      </p>
                    </div>

                    <p className="font-medium dark:text-white">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-5 pt-4 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Items
                  </span>

                  <span className="dark:text-white">
                    {finalItems.length}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Delivery
                  </span>

                  <span className="text-green-600">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span className="dark:text-white">
                    Total
                  </span>

                  <span className="text-purple-600">
                    ₹{total}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;