import { BookModel } from "../models/Book.model.js";
import moment from "moment";
const postBook = async (req, res) => {
  try {
    const {
      Title,
      Author,
      Genre,
      PublishedDate,
      AvailableCopies,
      TotalCopies,
    } = req.body;
    if (
      !(
        Title ||
        Author ||
        Genre ||
        PublishedDate ||
        AvailableCopies ||
        TotalCopies
      )
    ) {
      return res.status(400).json("All fields are mendatory");
    }
    if (AvailableCopies > TotalCopies) {
      return res
        .status(400)
        .json("Available copies cant be greater than total copies");
    }
    const formattedDate = moment(PublishedDate, "DD/MM/YYYY").toDate();
   
    const book = await BookModel.create({
      Title,
      Author,
      Genre,
      PublishedDate: formattedDate,
      AvailableCopies,
      TotalCopies,
    });
    return res.status(200).json(book);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json("Something wrong while creating the book");
  }
};
const getBooks = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json("Invalid user");
    }
    const books = await BookModel.find({});
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json("Something wrong while getting the book");
  }
};
const getBooksById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(400).json("Book doesnt exists");
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json("Something wrong while getting the book by Id");
  }
};
export { postBook, getBooks, getBooksById };
