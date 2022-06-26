const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    Name: String,
    Brand: String,
    Imgs: [String],
    Category:String,
    Price: Number,
    Sold: Number,
    Rating: Number,
    Reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    IsPreOrder: Boolean,
    DescBullets:String,
    Desc: String,
    Quantity: Number,
    HowToUse: [[String]],
    Features: [],
    Banner: String,
    FAQs: [],
    Extra: [],
})

const Product = new mongoose.model('Product', productSchema)
module.exports = Product