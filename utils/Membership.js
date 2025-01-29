import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  membership: {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    benefits: { type: [String] },
    joinedAt: { type: Date, default: Date.now }
  },
  transactions: [
    {
      transactionId: { type: String, required: true, unique: true },
      amount: { type: Number, required: true }, // Store in paisa (Khalti format)
      status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
      paymentMethod: { type: String, default: "Khalti" },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
