import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  title: { type: String, required: [true, "Obligatory field"] },
  isbn: { type: String, required: [true, "Obligatory field"], unique: true },
  synopsis: { type: String },
  genres: { type: String },
  publication_year: {
    type: String,
    required: [true, "Obligatory field"],
    unique: true
  },
  publisher_id: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }
});

module.exports = mongoose.model("Book", BookSchema);
