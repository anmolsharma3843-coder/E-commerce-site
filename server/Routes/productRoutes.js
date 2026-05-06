import { Router } from "express";
import {
  getProducts,
  getProductDetails,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductslist,
} from "../controller/productController.js";

import { authenicate, authorizeAdmin } from "../Middleware/Authenticate.js";

const router = Router();

// ✅ PUBLIC ROUTES

// GET ALL PRODUCTS
router.get("/", getProducts);
router.get("/list", getProductslist);

// SEARCH PRODUCTS


// GET SINGLE PRODUCT
router.get("/:id", getProductDetails);


// ✅ ADMIN ROUTES

// ADD PRODUCT
router.post("/", authenicate, authorizeAdmin, addProduct);

// UPDATE PRODUCT
router.put("/:id", authenicate, authorizeAdmin, updateProduct);

// DELETE PRODUCT
router.delete("/:id", authenicate, authorizeAdmin, deleteProduct);


export default router;