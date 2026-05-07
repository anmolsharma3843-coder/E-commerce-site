import { Router } from "express";

import {
  getProducts,
  getProductDetails,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductslist,
  getAllProducts,
} from "../controller/productController.js";

import {
  authenicate,
  authorizeAdmin,
} from "../Middleware/Authenticate.js";

const router = Router();

// ✅ PUBLIC ROUTES

router.get("/", getProducts);

router.get("/all", getAllProducts);

router.get("/list", getProductslist);

router.get("/:id", getProductDetails);

// ✅ ADMIN ROUTES

router.post("/", authenicate, authorizeAdmin, addProduct);

router.put("/:id", authenicate, authorizeAdmin, updateProduct);

router.delete("/:id", authenicate, authorizeAdmin, deleteProduct);

export default router;