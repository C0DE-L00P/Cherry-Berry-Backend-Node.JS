const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  Name: String,
  Count: Number,
  Products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  Img: String,
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;