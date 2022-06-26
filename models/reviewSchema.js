const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  Author: String,
  AuthorImg: String,
  Email: String,
  PublishDate: String,
  Content: String,
  Rating: Number,
  Product: {type: Schema.Types.ObjectId, ref: 'Product'},
});

const Review = new mongoose.model('Review',reviewSchema);
module.exports = Review;