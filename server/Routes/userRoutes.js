import { Router } from "express";
import { getUsers, deleteUser } from "../controller/UserController.js";
import { authenicate, authorizeAdmin } from "../Middleware/Authenticate.js";

const router = Router();

// GET USERS
router.get("/", authenicate, authorizeAdmin, getUsers);

// DELETE USER
router.delete("/:id", authenicate, authorizeAdmin, deleteUser);

export default router;