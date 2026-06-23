// controllers/cartController.js
import { Cart } from "../Model/cartModelSchema.js";

export const addToCart = async (req, res) => {
  const { product } = req.body;
  const userId = req.user.id;
  if (!product || !product._id || !product.price || !product.title) {
    return res.status(400).json({ message: "Invalid product" });
  }
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existing = cart.items.find(
    (item) => item.productId === product._id
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({
      productId: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      qty: 1,
    });
  }

  await cart.save();
  res.json(cart.items);
};
export const updateQty = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find((i) => i.productId === id);

  if (!item) return res.status(404).json({ message: "Item not found" });

  if (action === "increase") item.qty += 1;
  if (action === "decrease" && item.qty > 1) item.qty -= 1;

  await cart.save();
  res.json(cart.items);
};
export const removeItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });

  cart.items = cart.items.filter((i) => i.productId !== id);

  await cart.save();
  res.json(cart.items);
};
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json([]);
    }

    res.json(cart.items);
  } catch (error) {
    console.error("Get Cart Error:", error);

    res.status(500).json({
      message: "Failed to load cart",
    });
  }
};