import { user } from "../Model/UserModelSchema.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const users = await user.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const existingUser = await user.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (existingUser.isAdmin) {
      return res.status(403).json({
        message: "Admin cannot be deleted",
      });
    }

    await user.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "profiles",
      }
    );

    // Remove local file after successful upload
    fs.unlinkSync(req.file.path);

    const updatedUser = await user.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          profileImage: result.secure_url,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      profileImage: result.secure_url,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};