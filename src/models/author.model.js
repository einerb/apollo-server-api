import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
  first_name: { type: String, required: [true, "Obligatory field"] },
  last_name: { type: String },
  country: { type: String }
});

module.exports = mongoose.model("Autor", AuthorSchema);
