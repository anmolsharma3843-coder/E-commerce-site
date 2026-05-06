import express from "express";
import { Order } from "../Model/Order.js";
import { Cart } from "../Model/UserModelSchema.js";
import { authenicate } from "../Middleware/Authenticate.js";

const router = express.Router();
// middleware should set req.user.id

router.get("/myorders", authenicate, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });
    console.log(orders)
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const { userId, orderData, cartItems } = req.body;

      if (!userId || !cartItems) {
      return res.status(400).json({ error: "Missing data" });
    }
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const newOrder = new Order({
      userId,
      items: cartItems,
      address: orderData,
      paymentMethod: orderData.cardNumber ? "Card" : "UPI",
      totalAmount: total,
    });

    await newOrder.save();
   console.log(newOrder)
    // ✅ CLEAR CART
    await Cart.deleteMany({ userId });

    res.json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL ORDERS (ADMIN)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// ✅ GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});
// ✅ UPDATE ORDER STATUS
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;