import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  country: { type: String },
  book_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
});

module.exports = mongoose.model("Author", AuthorSchema);
