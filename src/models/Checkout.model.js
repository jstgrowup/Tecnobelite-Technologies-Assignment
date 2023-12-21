import { Schema, model, ObjectId } from "mongoose";
import cron from "node-cron";
import { UserModel } from "./User.model.js";

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
cron.schedule("0 0 * * *", async () => {
  const finedBooks = await CheckoutModel.find({
    ReturnDate: { $lt: new Date() },
    Status: "issued",
  });
  finedBooks.map(async (checkoutDetail) => {
    await UserModel.findByIdAndUpdate(checkoutDetail.UserId, {
      $inc: { LateReturedFine: 10 },
    });
  });
});
