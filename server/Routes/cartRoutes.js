import { Router } from "express";
import { authenticate } from "../Middleware/Authenticate.js"; // adjust path

import {
  addToCart,
  getCart,
  removeItem,
  updateQty,
} from "../controller/cartController.js";

const router = Router();

// Get full cart
router.get("/", authenticate, getCart);

// Add item to cart
router.post("/", authenticate, addToCart);

// Update quantity
router.put("/update/:id", authenticate, updateQty);

// Remove item
router.delete("/:id", authenticate, removeItem);

export default router;
