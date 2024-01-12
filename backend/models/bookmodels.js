import mongoose from "mongoose";

const bookschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timstamps: true }
);
export const Book = mongoose.model("Book", bookschema);
