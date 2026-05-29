import { Router } from "express";

import {
  getProductslist,
  getAllProducts,
  getProductDetails,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controller/ProductController.js";

import {
  authenicate,
  authorizeAdmin,
} from "../Middleware/Authenticate.js";

import { uploadProduct } from "../Middleware/upload.js";

const router = Router();

// GET
router.get("/", getProducts);
router.get("/list", getProductslist);
router.get("/all", getAllProducts);
router.get("/:id", getProductDetails);

// CREATE PRODUCT
router.post(
  "/",
  authenicate,
  authorizeAdmin,
  uploadProduct.single("image"),
  createProduct
);

// UPDATE PRODUCT
router.put(
  "/:id",
  authenicate,
  authorizeAdmin,
  uploadProduct.single("image"),
  updateProduct
);

// DELETE
router.delete(
  "/:id",
  authenicate,
  authorizeAdmin,
  deleteProduct
);

export default router;