import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  khaltiToken: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    default: null,
  },
  membershipType: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists before defining
export default mongoose.models.Membership || mongoose.model("Membership", MembershipSchema);
