import dotenv from "dotenv";
import connect from "./db/db";
import app from "./app";
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server connected ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongoDB error", err);
  });
