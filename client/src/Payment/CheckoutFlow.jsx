import React, { useEffect, useState } from "react";
import CheckoutPage from "../Payment/CheckoutPage";
import PaymentPage from "../Payment/PaymentPage";
import ReviewPage from "../Payment/ReviewPage";
import StepIndicator from "../Payment/StepIndicator";
import AnimatedStep from "./AnimatedStep";
import { getCart } from "../services/Cartitems";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CheckoutFlow = () => {
  const [step, setStep] = useState(1);
  const [cartitem, setCartitem] = useState([])
  const [orderData, setOrderData] = useState({});
  const [Loading, setLoading] = useState(true);
  const location = useLocation();

  const buyNowItem = location.state?.buyNowItem;
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartitem(data)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);


  const finalItems = buyNowItem
    ? [buyNowItem]
    : cartitem;

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">

      <div className="max-w-5xl mx-auto px-4">

        {/* 🔥 STEP INDICATOR */}
        <StepIndicator currentStep={step} />

        <div className="flex justify-center mt-6">

          {/* LEFT SIDE */}
          <div className="space-y-4 w-full">

            {/* 🏠 ADDRESS */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg dark:text-white">
                  1. Delivery Address
                </h2>

                {step > 1 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-purple-600 text-sm"
                  >
                    Change
                  </button>
                )}
              </div>

              {step === 1 ? (
                <CheckoutPage nextStep={nextStep} />
              ) : (
                <p className="text-sm dark:text-gray-300">
                  {orderData.address || "Saved Address"}
                </p>
              )}
            </div>

            {/* 💳 PAYMENT */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg dark:text-white">
                  2. Payment Method
                </h2>

                {step > 2 && (
                  <button
                    onClick={() => setStep(2)}
                    className="text-purple-600 text-sm"
                  >
                    Change
                  </button>
                )}
              </div>

              {step === 2 ? (
                <PaymentPage nextStep={nextStep} prevStep={prevStep} />
              ) : step > 2 ? (
                <p className="text-sm dark:text-gray-300">
                  {orderData.payment || "UPI / Card Selected"}
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Complete address step first
                </p>
              )}
            </div>

            {/* 🧾 REVIEW */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
              <h2 className="font-semibold text-lg mb-3 dark:text-white">
                3. Review Order
              </h2>

              {step === 3 ? (
                <ReviewPage
                  orderData={orderData}
                  prevStep={prevStep}
                  cartItems={finalItems}
                  buyNow={!!buyNowItem}
                />
              ) : (
                <p className="text-sm text-gray-400">
                  Complete payment step first
                </p>
              )}
            </div>

          </div>



        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;