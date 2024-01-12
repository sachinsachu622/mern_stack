import express from "express";
const app = express();
import { port, mongoDBURL } from "./config.js";
// imported port value from config.js
import mongoose from "mongoose";
import bookRouter from "./router/bookroute.js";
import { Book } from "./models/bookmodels.js";
import cors from "cors";
// imported model from models
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5555",
    methods: ["PUT", "GET", "POST", "DELETE"],
    allowedHeaders: "content-type",
  })
);
app.use("/books", bookRouter);
//to use json file send as request body
app.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    res.status(233).json({ count: book.length, data: book });
  } catch (error) {
    console.log("error is", error.message);
    res.status(500).send(error.message);
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    //run the listen function if only database is connected
    app.listen(port, () => {
      console.log(`listening to port :${port}`);
    });
    console.log("app connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
