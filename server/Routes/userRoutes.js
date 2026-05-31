import { Router } from "express";
import {
  getUsers,
  deleteUser,
  uploadProfileImage,
} from "../controller/UserController.js";
import { authenicate, authorizeAdmin } from "../Middleware/Authenticate.js";
import { uploadProfile } from "../Middleware/upload.js";

const router = Router();

// GET USERS
router.get("/", authenicate, authorizeAdmin, getUsers);

// DELETE USER
router.delete("/:id", authenicate, authorizeAdmin, deleteUser);
router.patch(
  "/upload-profile",
  authenicate,
  uploadProfile.single("image"),
  uploadProfileImage
);


export default router;