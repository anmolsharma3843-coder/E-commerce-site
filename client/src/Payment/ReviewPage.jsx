import { useEffect, useState } from "react";
import SuccessScreen from "./SuccessScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeFromCart,
  updateCartQty,
} from "../services/Cartitems";
import { MdDeleteOutline } from "react-icons/md";
import { cartActions } from "../store/cartSlice";
import Model from "../components/Model";
import { createOrder } from "../services/orderService";

const ReviewPage = ({
  orderData,
  prevStep,
  buyNow,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    id: null,
    title: "",
  });

  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        dispatch(cartActions.setCart(data));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  const handleIncrease = async (id) => {
    try {
      dispatch(cartActions.increaseQty(id));

      const data = await updateCartQty(id, "increase");

      dispatch(cartActions.setCart(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrease = async (id) => {
    try {
      const item = cartItems.find(
        (item) => item.productId === id
      );

      if (item?.qty <= 1) return;

      dispatch(cartActions.decreaseQty(id));

      const data = await updateCartQty(id, "decrease");

      dispatch(cartActions.setCart(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const data = await removeFromCart(id);

      dispatch(cartActions.setCart(data));
    } catch (err) {
      console.log(err);
    }

    setModal({
      open: false,
      id: null,
      title: "",
    });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const tax = Math.round(total * 0.1);

  const grandTotal = total + tax;

  const handleConfirm = async () => {
    try {
      const userId = user._id;

      await createOrder({
        userId,
        orderData,
        cartItems,
        buyNow,
      });

      if (!buyNow) {
        dispatch(cartActions.setCart([]));
      }

      setConfirmed(true);
    } catch (err) {
      console.log("Order failed:", err.message);
    }
  };

  if (confirmed) {
    return <SuccessScreen />;
  }

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <p className="text-gray-500">
          Loading your order...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-5">
          {/* ADDRESS */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <h3 className="font-semibold text-lg mb-3 dark:text-white">
              Delivery Address
            </h3>

            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p>{orderData.name}</p>

              <p>{orderData.phone}</p>

              <p>{orderData.address}</p>

              <p>
                {orderData.city} - {orderData.pincode}
              </p>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <h3 className="font-semibold text-lg mb-3 dark:text-white">
              Payment Method
            </h3>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              {orderData.payment ===
              "Credit / Debit Card" ? (
                <p>
                  💳 Card ending in ****{" "}
                  {orderData.cardNumber?.slice(-4)}
                </p>
              ) : orderData.payment ===
                "UPI" ? (
                <p>
                  📱 UPI: {orderData.upi}
                </p>
              ) : (
                <p>
                  💵 Cash on Delivery
                </p>
              )}
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <h3 className="font-semibold text-lg mb-4 dark:text-white">
              Order Items
            </h3>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="
                    flex gap-3
                    rounded-2xl
                    border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900
                    p-3
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="
                      w-20 h-20
                      sm:w-24 sm:h-24
                      object-contain
                      rounded-xl
                      bg-gray-100 dark:bg-gray-800
                      shrink-0
                      p-2
                    "
                  />

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm sm:text-base dark:text-white line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price}
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      Free Delivery
                    </p>

                    {!buyNow && (
                      <div
                        className="
                          mt-3
                          flex items-center
                          border border-gray-300 dark:border-gray-600
                          rounded-full
                          overflow-hidden
                          w-fit
                        "
                      >
                        <button
                          onClick={() =>
                            handleDecrease(
                              item.productId
                            )
                          }
                          disabled={
                            item.qty <= 1
                          }
                          className="
                            w-8 h-8
                            disabled:opacity-50
                            dark:text-white
                          "
                        >
                          −
                        </button>

                        <span className="w-10 text-center dark:text-white">
                          {item.qty}
                        </span>

                        <button
                          onClick={() =>
                            handleIncrease(
                              item.productId
                            )
                          }
                          className="w-8 h-8 dark:text-white"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  {/* PRICE + REMOVE */}
                  <div className="flex flex-col justify-between items-end">
                    {!buyNow && (
                      <button
                        onClick={() =>
                          setModal({
                            open: true,
                            id: item.productId,
                            title:
                              item.title,
                          })
                        }
                        className="
                          text-red-500
                          hover:text-red-600
                          transition
                        "
                      >
                        <MdDeleteOutline
                          size={20}
                        />
                      </button>
                    )}

                    <div className="text-right">
                      <p className="font-bold dark:text-white">
                        ₹
                        {item.price *
                          item.qty}
                      </p>

                      <p className="text-xs text-gray-400 line-through">
                        ₹
                        {item.price *
                          item.qty +
                          200}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div
          className="
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-2xl
            p-5
            lg:sticky lg:top-6
            h-fit
          "
        >
          <h3 className="text-lg font-semibold mb-5 dark:text-white">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>

              <span className="text-green-600">
                FREE
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>

              <span>₹{tax}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="dark:text-white">
                Total
              </span>

              <span className="text-purple-600">
                ₹{grandTotal}
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="
              w-full mt-5
              bg-purple-600
              hover:bg-purple-700
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
            "
          >
            Place Order
          </button>

          <button
            onClick={prevStep}
            className="
              w-full mt-3
              border border-gray-300 dark:border-gray-600
              py-3
              rounded-xl
              dark:text-white
              hover:bg-gray-50
              dark:hover:bg-gray-700
              transition
            "
          >
            ← Back
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            🔒 Secure Checkout • Easy Returns •
            Fast Delivery
          </p>
        </div>
      </div>

      {/* REMOVE MODAL */}
      {modal.open && (
        <Model
          title={modal.title}
          remove={() =>
            handleRemove(modal.id)
          }
          Cancel={() =>
            setModal({
              open: false,
              id: null,
              title: "",
            })
          }
        />
      )}
    </>
  );
};

export default ReviewPage;