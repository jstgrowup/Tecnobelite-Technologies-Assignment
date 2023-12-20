import express from "express";
import userRouter from "./routes/User.route";
import bookRouter from "./routes/Book.route";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(userRouter);
app.use(bookRouter);
export default app;
