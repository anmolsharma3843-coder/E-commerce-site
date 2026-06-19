import express from "express";
import { authenticate } from "../Middleware/Authenticate.js";

import {
  getMyOrders,
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  getTotalSales,
} from "../controller/orderController.js";

const router = express.Router();

//  USER ORDERS
router.get("/myorders", authenticate, getMyOrders);

//  CREATE ORDER
router.post("/create",authenticate, createOrder);

//  GET ALL ORDERS
router.get("/", getAllOrders);
router.get("/sales", getTotalSales);

//  GET SINGLE ORDER
router.get("/:id", getSingleOrder);

//  UPDATE STATUS
router.put("/update-status/:id", updateOrderStatus);



export default router;