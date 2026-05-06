import { Router } from "express";
import { authenicate } from "../Middleware/Authenticate.js"; // adjust path

import {
  addToCart,
  getCart,
  removeItem,
  updateQty,
} from "../controller/cartController.js";

const router = Router();

// Get full cart
router.get("/", authenicate, getCart);

// Add item to cart
router.post("/", authenicate, addToCart);

// Update quantity
router.put("/update/:id", authenicate, updateQty);

// Remove item
router.delete("/:id", authenicate, removeItem);

export default router;
