import { Router } from "express";

import {
  checkoutBook,
  returnBook,
} from "../controllers/Checkout.controller.js";
import { AuthMiddlewareForToken } from "../middlewares/auth.middleware.js";
const checkoutRouter = Router();
checkoutRouter
  .route("/library/checkout/:bookId")
  .post(AuthMiddlewareForToken, checkoutBook);
checkoutRouter
  .route("/library/checkout/return-book/:bookId")
  .post(AuthMiddlewareForToken, returnBook);

export default checkoutRouter;
