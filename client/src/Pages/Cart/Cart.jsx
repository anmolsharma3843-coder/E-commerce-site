import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import Model from "../../components/Model";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import { cartActions } from "../../store/cartSlice";
import { getCart, removeFromCart } from "../../services/Cartitems";
import Emptycart from "../Cart/Emptycart";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart) || [];

  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    open: false,
    id: null,
    title: "",
  });

  // ✅ FETCH CART
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

  // ✅ TOTAL PRICE
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [cartItems]);

  // ✅ OPEN REMOVE MODAL
  const openRemoveModal = (id, title) => {
    setModal({
      open: true,
      id,
      title,
    });
  };

  // ✅ REMOVE ITEM
  const handleRemove = async () => {
    try {
      const data = await removeFromCart(modal.id);

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

  // ✅ LOADING STATE
  if (loading) {
    return (
      <>
        <Header />

        <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">

          <div className="max-w-7xl mx-auto px-4 py-8">

            <div className="animate-pulse space-y-4">

              {/* TITLE */}
              <div className="h-8 w-52 rounded-lg bg-gray-300 dark:bg-gray-700" />

              {/* SKELETON ITEMS */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    rounded-2xl p-4
                    flex gap-4
                  "
                >

                  <div className="w-28 h-28 rounded-xl bg-gray-300 dark:bg-gray-700" />

                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />

                    <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />

                    <div className="h-4 w-1/4 rounded bg-gray-300 dark:bg-gray-700" />

                    <div className="flex gap-3 pt-3">
                      <div className="h-10 w-28 rounded-xl bg-gray-300 dark:bg-gray-700" />

                      <div className="h-10 w-24 rounded-xl bg-gray-300 dark:bg-gray-700" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700" />

                    <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ✅ EMPTY CART
  if (cartItems.length === 0) {
    return <Emptycart />;
  }

  return (
    <>
      <Header />

      <div className="bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors duration-300">

        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* PAGE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Shopping Cart
              </h1>

              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {cartItems.length} item
                {cartItems.length > 1 ? "s" : ""} in your cart
              </p>
            </div>

            <div
              className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                px-4 py-3 rounded-xl shadow-sm
              "
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Total Amount
              </p>

              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{totalPrice}
              </p>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-4">

              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onRemove={openRemoveModal}
                />
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:sticky lg:top-24 h-fit">
              <CartSummary
                cartItems={cartItems}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>

      {/* REMOVE MODAL */}
      {modal.open && (
        <Model
          title={modal.title}
          remove={handleRemove}
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

export default Cart;