import { Router } from "express";
import {
  getBooks,
  getBooksById,
  postBook,
} from "../controllers/Book.controller.js";
import { AuthMiddlewareForToken } from "../middlewares/auth.middleware.js";
const bookRouter = Router();
bookRouter.route("/library/books").post(AuthMiddlewareForToken, postBook);

bookRouter.route("/library/books").get(AuthMiddlewareForToken, getBooks);
bookRouter
  .route("/library/books/:id")
  .get(AuthMiddlewareForToken, getBooksById);

export default bookRouter;
