import { user } from "../Model/UserModelSchema.js";

export const getUsers = async (req, res) => {
  const users = await user.find({});
  res.json(users);
};
export const deleteUser = async (req, res) => {
  try {
   
    const deletedUser = await user.findById(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
       if (deletedUser.isAdmin) {
        console.log("admin")
      return res.status(403).json({ message: "Admin cannot be deleted" });
    }
       await user.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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

    const imagePath = `/uploads/profiles/${req.file.filename}`;

    // UPDATE USER IN DATABASE
    const updatedUser = await user.findByIdAndUpdate(
      req.user.id,
      {
        profileImage: imagePath,
      },
      { new: true }
    );

    res.json({
      success: true,
      imageUrl: imagePath,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};  