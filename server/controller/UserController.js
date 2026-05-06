import { user } from "../Model/UserModelSchema.js";

export const getUsers = async (req, res) => {
  const users = await user.find({});
  res.json(users);
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};