import express from "express";
const Router = express.Router();
import { Book } from "../models/bookmodels.js";

Router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(404).send("send all required feilds");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    //create a new object in Book
    res.status(233).send(book);
    // send the updated feild
  } catch (error) {
    console.log("error is", error.message);
    res.status(500).send(error.message);
  }
});

Router.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    res.status(233).json(book);
  } catch (error) {
    console.log("error is", error.message);
    res.status(500).send(error.message);
  }
});
Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send("data not found");
    }
    res.status(233).json(book);
  } catch (error) {
    console.log("error is", error.message);
    res.status(500).send(error.message);
  }
});
Router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(404).send("send all required feilds");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).send("data not found");
    }
    res.status(233).json("successfully updated");
  } catch (error) {
    console.log("error is", error.message);
    res.status(500).send(error.message);
  }
});
Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send("data not found");
    }
    res.status(233).json("successfully deleted");
  } catch (error) {
    console.log("error is", error.message);
    res.status(500).send(error.message);
  }
});
export default Router;
