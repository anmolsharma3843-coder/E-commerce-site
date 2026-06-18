import express from "express";
import { authenicate } from "../Middleware/Authenticate.js";

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
router.get("/myorders", authenicate, getMyOrders);

//  CREATE ORDER
router.post("/create",authenicate, createOrder);

//  GET ALL ORDERS
router.get("/", getAllOrders);
router.get("/sales", getTotalSales);

//  GET SINGLE ORDER
router.get("/:id", getSingleOrder);

//  UPDATE STATUS
router.put("/update-status/:id", updateOrderStatus);



export default router;