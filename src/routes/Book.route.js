import { Router } from "express";
import {
  getBooks,
  getBooksById,
  postBook,
  updateBooksById,
  updateBooksByIdByPatch,
} from "../controllers/Book.controller.js";
import { AuthMiddlewareForToken } from "../middlewares/auth.middleware.js";
const bookRouter = Router();
bookRouter.route("/library/book").post(AuthMiddlewareForToken, postBook);

bookRouter.route("/library/books").get(AuthMiddlewareForToken, getBooks);
bookRouter
  .route("/library/books/:id")
  .get(AuthMiddlewareForToken, getBooksById);
bookRouter
  .route("/library/:bookId")
  .put(AuthMiddlewareForToken, updateBooksById);
bookRouter
  .route("/library/:bookId")
  .patch(AuthMiddlewareForToken, updateBooksByIdByPatch);

export default bookRouter;
