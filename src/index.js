import dotenv from "dotenv";
import connect from "./db/db.js";
import app from "./app.js";
const port = process.env.PORT || 3000;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server connected ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongoDB error", err);
  });
