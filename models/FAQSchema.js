const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FAQSchema = new Schema({
  Q: String,
  A: String,
});

const FAQ = new mongoose.model('FAQ',FAQSchema)

module.exports = FAQ