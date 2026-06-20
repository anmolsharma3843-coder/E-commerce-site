import { useEffect, useState } from "react";
import SuccessScreen from "./SuccessScreen";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart, updateCartQty } from "../services/Cartitems";
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
  const [Loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null, title: "" });
   const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
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
    dispatch(cartActions.increaseQty(id));
    const data = await updateCartQty(id, "increase");
    dispatch(cartActions.setCart(data));
  };

  const handleDecrease = async (id) => {
    dispatch(cartActions.decreaseQty(id));
    const data = await updateCartQty(id, "decrease");
    dispatch(cartActions.setCart(data));
  };

  const handleRemove = async (id) => {
    try {
      const data = await removeFromCart(id);
      dispatch(cartActions.setCart(data));
    } catch (err) {
      console.log(err);
    }
    setModal({ open: false, id: null, title: "" });
  };

 const total = cartItems.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
);
   const handleConfirm = async () => {
  try {
    const userId = user._id

    await createOrder({
  userId,
  orderData,
  cartItems,
  buyNow,
});
     console.log(orderData)
   if (!buyNow) {
  dispatch(cartActions.setCart([]));
}

    // ✅ show success UI
    setConfirmed(true);

  } catch (err) {
    console.log("Order failed:", err.message);
  }
};
  if (confirmed) return <SuccessScreen />;

  if (Loading) {
    return (
      <div className="min-h-screen flex justify-center items-center dark:bg-gray-900">
        <p className="text-gray-500">Loading your order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* Address */}
          <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Delivery Address
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {orderData.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {orderData.address}, {orderData.city}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Payment Method
            </h3>
            {orderData.cardNumber ? 
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Card ending in **** {orderData.cardNumber?.slice(-4)}
            </p>
            :<p className="text-sm text-gray-600 dark:text-gray-300">
              UPI ID: {orderData.upi}
            </p>
}
          </div>

          {/* Items */}
          <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 max-h-100 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Order Items
            </h3>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 md:hover:shadow-md transition bg-white dark:bg-gray-900"
                >
                  {/* Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded-xl bg-gray-100 p-2"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ₹{item.price}  • In Stock
                    </p>

                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Free Delivery
                    </span>

                    {/* Qty */}
                    {!buyNow && (
  <div className="mt-3 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 w-fit">

    <button
      onClick={() => handleDecrease(item.productId)}
      className="px-2 text-lg md:hover:text-red-500 dark:text-white"
    >
      −
    </button>

    <span className="px-3 font-medium text-gray-800 dark:text-white">
      {item.qty}
    </span>

    <button
      onClick={() => handleIncrease(item.productId)}
      className="px-2 text-lg md:hover:text-green-500 dark:text-white"
    >
      +
    </button>

  </div>
)}
                  </div>

                  {/* Right */}
                  <div className="flex flex-col justify-between items-end">
                    {!buyNow && (
  <button
    onClick={() =>
      setModal({
        open: true,
        id: item.productId,
        title: item.title,
      })
    }
    className="p-2 rounded-full md:hover:bg-red-100 dark:md:hover:bg-red-900/30 text-red-500 transition"
  >
    <MdDeleteOutline size={20} />
  </button>
)}

                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        ₹{item.price * item.qty}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        ₹{item.price * item.qty + 200}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 sticky top-6 h-fit">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹50</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{Math.round(total * 0.1)}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg text-green-600 dark:text-green-400">
            <span>Total</span>
            <span>₹{total + 50 + Math.round(total * 0.1)}</span>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full mt-5 bg-linear-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-md md:hover:scale-[1.02] md:hover:shadow-lg transition-all"
          >
            Place Order
          </button>

          <button
            onClick={prevStep}
            className="w-full mt-3 border border-gray-300 dark:border-gray-600 py-2 rounded-xl md:hover:bg-gray-100 dark:md:hover:bg-gray-700 transition dark:text-gray-100"
          >
            ← Back
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            🔒 Secure Checkout • Easy Returns • Fast Delivery
          </p>
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <Model
          title={modal.title}
          remove={()=>handleRemove(modal.id)}
          Cancel={() => setModal({ open: false, id: null, title: "" })}
        />
      )}
    </div>
  );
};

export default ReviewPage;