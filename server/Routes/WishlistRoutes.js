import express from "express";
import { getWishlist, toggleWishlist, } from "../controller/WishlistController.js";
import { authenticate } from "../Middleware/Authenticate.js";


const router = express.Router();

router.get("/", authenticate, getWishlist);
router.post("/", authenticate, toggleWishlist);

export default router;