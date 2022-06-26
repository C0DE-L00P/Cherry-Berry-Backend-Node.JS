const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

const userSchema = new Schema({
  Username: String,
  FirstName: String,
  LastName: String,
  DisplayName: String,
  Email: String,
  Password: String,
  PaymentMethods: [
    {
      CardNumber: Number,
      CardHolderName: String,
      ExpiryDate: String,
    },
  ],
  Phone: String,
  AlternativePhone: String,
  BillingAddress: {
    StreetAddress: String,
    Country: String,
    City: String,
  },
  ShippingAddress: {
    CompanyName: String,
    StreetAddress: String,
    Country: String,
    City: String,
    State: String,
    Postcode: Number,
  },
  Favorites: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  Cart:[{Product: {type: Schema.Types.ObjectId, ref: 'Product'},Quantity: Number}],
});

// Reviews: [{Review:{type: Schema.Types.ObjectId, ref: 'Review'},Product:{type: Schema.Types.ObjectId, ref: 'Product'}}],
// Orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],

//TODO For Encryption 
userSchema.plugin(mongooseFieldEncryption, { 
  fields: ["Password"], 
  secret: process.env.PASS_ENCRYPTION_KEY,
});

const User = new mongoose.model("User", userSchema);
module.exports = User;