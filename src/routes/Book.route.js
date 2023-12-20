import { Router } from "express";
import { getBooks } from "../controllers/Book.controller";
const bookRouter = Router();
bookRouter.route("/library/books").get(getBooks);
bookRouter.route("/library/books/:id").get(getBooks);

export default bookRouter;
