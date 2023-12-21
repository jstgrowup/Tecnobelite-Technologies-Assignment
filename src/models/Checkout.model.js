import { Schema, model, ObjectId } from "mongoose";
const CheckoutSchema = new Schema({
  BookId: {
    type: Schema.Types.ObjectId,
    ref: "books",
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  CheckoutDate: {
    type: Date,
    required: true,
  },
  ReturnDate: {
    type: Date,
    required: true,
  },
  LateReturedFine: {
    type: Number,
    required: true,
    default: 0,
  },
  Status: {
    type: String,
    enum: ["issued", "returned"],
  },
});
export const CheckoutModel = model("checkouts", CheckoutSchema);
