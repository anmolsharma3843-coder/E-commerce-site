import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,

    items: [
      {
        productId: String,
        title: String,
        price: Number,
        qty: Number,
        imageUrl: String,
      },
    ],

    address: {
      name: String,
      address: String,
      city: String,
    },

    paymentMethod: String,

    totalAmount: Number,

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order=mongoose.model("Order", orderSchema);
export {Order};