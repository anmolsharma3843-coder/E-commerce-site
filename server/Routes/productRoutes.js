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
  authenticate,
  authorizeAdmin,
} from "../Middleware/Authenticate.js";

import { uploadProduct } from "../Middleware/upload.js";

const router = Router();

/**
 * PUBLIC ROUTES
 */
router.get("/", getProducts);
router.get("/list", getProductslist);
router.get("/all", getAllProducts);
router.get("/:id", getProductDetails);

/**
 * CREATE PRODUCT (ADMIN ONLY)
 */
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  uploadProduct.single("image"),
  createProduct
);

/**
 * UPDATE PRODUCT (ADMIN ONLY)
 */
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  uploadProduct.single("image"),
  updateProduct
);

/**
 * DELETE PRODUCT (ADMIN ONLY)
 */
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

export default router;