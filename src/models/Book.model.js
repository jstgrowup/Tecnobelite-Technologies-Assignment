import { Schema, model } from "mongoose";
const BookSchema = new Schema({
  Title: {
    type: String,
    required: true,
    unique: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  PublishedDate: {
    type: Date,
    required: true,
  },
  AvailableCopies: {
    type: Number,
    required: true,
  },
  TotalCopies: {
    type: Number,
    required: true,
  },
});



export const BookModel = model("books", BookSchema);
