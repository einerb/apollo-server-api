import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  country: { type: String }
});

module.exports = mongoose.model("Author", AuthorSchema);
