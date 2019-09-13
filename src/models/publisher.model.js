import mongoose from "mongoose";

const PublisherSchema = mongoose.Schema({
  name: { type: String, required: [true, "Obligatory field"] },
  foundation_year: { type: String, required: [true, "Obligatory field"] }
});

module.exports = mongoose.model("Publisher", PublisherSchema);
