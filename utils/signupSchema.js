// utils/signupSchema.js
import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
    },
    photo: {
      type: String, // URL or path to the photo
    },
    password: {
      type: String,

      minlength: 6,
    },
  },
  { timestamps: true },
);

const Signup = mongoose.models.Signup || mongoose.model("Signup", SignupSchema);

export default Signup;
