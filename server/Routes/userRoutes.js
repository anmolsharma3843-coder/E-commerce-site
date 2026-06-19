import { Router } from "express";

import {
  getUsers,
  deleteUser,
  uploadProfileImage,
} from "../controller/UserController.js";

import {
  authenticate,
  authorizeAdmin,
} from "../Middleware/Authenticate.js";

import { uploadProfile } from "../Middleware/upload.js";

const router = Router();

/**
 * GET ALL USERS (ADMIN ONLY)
 */
router.get("/", authenticate, authorizeAdmin, getUsers);

/**
 * DELETE USER (ADMIN ONLY)
 */
router.delete("/:id", authenticate, authorizeAdmin, deleteUser);

/**
 * UPLOAD PROFILE IMAGE (LOGGED IN USER)
 */
router.patch(
  "/upload-profile",
  authenticate,
  uploadProfile.single("image"),
  uploadProfileImage
);

export default router;