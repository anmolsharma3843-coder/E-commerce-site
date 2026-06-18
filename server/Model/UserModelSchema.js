import mongoose from "mongoose";
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, { timestamps: true })
export const user = mongoose.model('users', usersSchema);


