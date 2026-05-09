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
  const [modal, setModal] = useState({ open: false, id: null, title: "" });

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

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartItems]);

  const openRemoveModal = (id, title) => {
    setModal({ open: true, id, title });
  };

  const handleRemove = async () => {
    try {
      const data = await removeFromCart(modal.id);
      dispatch(cartActions.setCart(data));
    } catch (err) {
      console.log(err);
    }
    setModal({ open: false, id: null, title: "" });
  };

  if (loading) {
    return (
      <>
        <Header />
        <p className="text-center mt-20 text-gray-700 dark:text-gray-300">
          Loading cart...
        </p>
      </>
    );
  }

  // 🛒 Empty Cart
  if (cartItems.length === 0) {
    return (
    <Emptycart/>
    );
  }

  return (
    <>
      <Header />

      <div className="bg-gray-100 dark:bg-gray-950 min-h-screen py-8 transition">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Shopping Cart ({cartItems.length})
            </h2>

            {cartItems.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onRemove={openRemoveModal}
              />
            ))}
          </div>

          {/* RIGHT */}
          <CartSummary
            cartItems={cartItems}
            totalPrice={totalPrice}
          />
        </div>
      </div>

      {/* MODAL */}
      {modal.open && (
        <Model
          title={modal.title}
          remove={handleRemove}
          Cancel={() => setModal({ open: false })}
        />
      )}
    </>
  );
};

export default Cart;