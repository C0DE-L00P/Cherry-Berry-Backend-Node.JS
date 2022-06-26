const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Content: [{Product: {type: Schema.Types.ObjectId, ref: 'Product'},Quantity: Number}],
    Date: String,
    State: String,
    UserInfo: {type: Schema.Types.ObjectId, ref: 'User'},
    IsReviewed: Boolean,
});

const Order = new mongoose.model('Order',orderSchema);
module.exports = Order;