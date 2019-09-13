import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
  first_name: { type: String, required: [true, "Obligatory field"] },
  last_name: { type: String },
  country: { type: String },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }
});

module.exports = mongoose.model("Autor", AuthorSchema);
