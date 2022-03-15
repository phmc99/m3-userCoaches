import mongoose from "../database/index.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatarUrl: {
    type: String,
    required: true,
    default: "https://i.pinimg.com/736x/d3/3a/2d/d33a2d1b538f71b19af66d2276aa10e1.jpg"
  },
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    default: null
  },
})

const User = mongoose.model("User", UserSchema);

export default User