import generateAccessAndRefreshTokens from "../helpers/generateToken.js";
import { BookModel } from "../models/Book.model.js";
import { CheckoutModel } from "../models/Checkout.model.js";
import { UserModel } from "../models/User.model.js";
import bcrypt from "bcrypt";
import moment from "moment";

const convertDate = (date) => {
  try {
    return moment(date, "DD/MM/YYYY").toDate();
  } catch (error) {
    console.log("error:", error);
  }
};
const checkoutBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { CheckoutDate, ReturnDate, Status } = req.body;
    const user = req.user;
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(400).json("Book Doesnt exists");
    }
    if (!CheckoutDate || !ReturnDate) {
      return res.status(400).json("CheckoutDate and ReturnDate is required");
    }
    const foundUser = await UserModel.findById(user._id);
    if (!foundUser) {
      return res.status(400).json("Invalid token");
    }
    const checkoutDetails = await CheckoutModel.create({
      BookId: book._id,
      UserId: foundUser._id,
      CheckoutDate: convertDate(CheckoutDate),
      ReturnDate: convertDate(ReturnDate),
      Status,
    });

    return res.status(201).json(checkoutDetails);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json("Server error");
  }
};
const returnBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const user = req.user;
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(400).json("Book Doesnt exists");
    }
    const foundUser = await UserModel.findById(user._id);
    if (!foundUser) {
      return res.status(400).json("Invalid token");
    }
    await CheckoutModel.updateOne(
      {
        BookId: book._id,
        UserId: foundUser._id,
      },
      { $set: { Status: "returned" } }
    );

    return res.status(201).json("Status Updated");
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json("Server error");
  }
};
export { checkoutBook, returnBook };
