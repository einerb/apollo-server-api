import mongoose from "mongoose";

const PublisherSchema = mongoose.Schema({
  name: { type: String },
  foundation_year: { type: String }
});

module.exports = mongoose.model("Publisher", PublisherSchema);
