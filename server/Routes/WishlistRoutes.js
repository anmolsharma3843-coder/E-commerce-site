    import express from "express";
    import {
    getWishlist,
    toggleWishlist,
    } from "../controller/WishlistController.js";
    import { authenicate } from "../Middleware/Authenticate.js";


    const router = express.Router();

    router.get("/", authenicate,  getWishlist);
    router.post("/",authenicate,toggleWishlist);

    export default router;