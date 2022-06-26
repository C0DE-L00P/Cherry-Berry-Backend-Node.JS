const Product = require('../models/productSchema')
const Review = require('../models/reviewSchema')


// ---------------------- IDS

const products_get_id = (mreq, mres) => {
    Product.findById(mreq.params.id)
      .then((res_pro) => {
        reviewsFromIDs(res_pro, mres);
      })
      .catch(() => mres.sendStatus(404));
  }
const products_put_id = (mreq, mres) => {
    Product.findByIdAndUpdate(mreq.params.id, mreq.body, function (err, docs) {
      if (err) mres.sendStatus(400);
      else mres.json(docs);
    });
  }
const products_delete_id = (mreq, mres) => {
    Product.findByIdAndDelete(mreq.params.id, function (err, docs) {
      if (err) mres.sendStatus(400);
      else mres.sendStatus(200);
    });
  }


// ------------------------- General

const products_post = (mreq, mres) => {
    //Save product in the database
    let product = new Product(mreq.body);
    product
      .save()
      .then(() => {
        mres.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        mres.sendStatus(400);
      });
  }
const products_get = (mreq, mres) => {
    if (mreq.query.Name != undefined || mreq.query.name != undefined) {
      //String Query Param for Search
      let que = mreq.query.Name || mreq.query.name;
      Product.find({ Name: que })
        .then((filt_products) => {
          mres.json(filt_products);
        })
        .catch((err) => console.log(err));

    } else {
      //General
      Product.find()
        .then((result) => {
          mres.json(result);
        })
        .catch((err) => console.log(err));
    }
  }


  
async function reviewsFromIDs(result, res) {
    let reviewsList = [];
    let reviewsPromises = [];
  
    result.Reviews.forEach((revID) => {
      reviewsPromises.push(Review.findById(revID));
    });
  
    reviewsList = await Promise.all(reviewsPromises);
    result.Reviews = reviewsList;
    await res.json(result);
  }

  module.exports = {
    products_delete_id,
    products_get,
    products_get_id,
    products_post,
    products_put_id
  }