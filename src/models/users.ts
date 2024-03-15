import { populate } from "dotenv";
import mongoose, { model } from "mongoose";


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    firstName: {
      type: String,
      default: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    createdBy: {
      type: "ObjectId",
      ref: "Users",
      required: false,
    },
    updatedBy: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Users = model("users", userSchema);

export default Users;
