const Product = require('../models/productSchema')
const Review = require('../models/reviewSchema')


//----------------- IDS

const reviews_put_id = (mreq, mres) => {
    Review.findByIdAndUpdate(mreq.params.id, mreq.body, function (err, docs) {
      if (err) {
        console.log(err);
        mres.sendStatus(400);
      } else {
        //Success
        mres.json(docs);
      }
    });
  }

const reviews_delete_id = (mreq, mres) => {
    Review.findByIdAndDelete(mreq.params.id, function (err, docs) {
      if (err) {
        console.log(err);
        mres.sendStatus(400);
      } else mres.sendStatus(200);
    });
  }

const reviews_get_id = (mreq, mres) => {
    Review.findById(mreq.params.id).then((result_review) => {
      mres.json(result_review);
    });
  }


//----------------- General

const reviews_post = (mreq, mres) => {
    //add a review in the database
    let review = new Review(mreq.body);

    review
      .save()
      .then((result_review) => {
        Product.findById(result_review.Product).then((result_product) => {
          let product = new Product(result_product);

          //To calc the new rating
          console.log("product rating", product.Rating);

          let newRating =
            (product.Rating * product.Reviews.length + result_review.Rating) /
            (product.Reviews.length + 1);
          product.Rating = Math.round(newRating);
          console.log("newRating", newRating);
          console.log("newRating round", Math.round(newRating));
          console.log("product rating after", product.Rating);

          product.Reviews.push(result_review._id);
          product.Sold = product.Sold + 1;
          product.Quantity = product.Quantity - 1;

          Product.findByIdAndUpdate(
            result_review.Product,
            {
              Quantity: product.Quantity,
              Sold: product.Sold,
              Reviews: product.Reviews,
              Rating: product.Rating,
            },
            function (err) {
              if (err) {
                console.log(err);
                mres.sendStatus(400);
              } else {
                mres.sendStatus(200);
              }
            }
          );
        });
      })
      .catch((error) => {
        console.log("%c Error in saving data in mongo" + error, "color: red;");
      });
  }

const reviews_get = (mreq, mres) => {
    if (mreq.query.email != undefined || mreq.query.Email != undefined) {
      //Search for Reviews by UserID
      let que = mreq.query.email || mreq.query.Email;
      Review.find({ Email: que }).then((res_reviews) => mres.json(res_reviews));

    } else if (mreq.query.pid != undefined || mreq.query.PID != undefined) {
      //Search for all reviews for a specific product by ProductID
      let que = mreq.query.pid || mreq.query.PID;
      Review.find({ Product: que }).then((res_reviews) => mres.json(res_reviews));

    } else Review.find().then((result) => mres.json(result)); //Get all reviews
  }

  module.exports = {
    reviews_get,
    reviews_delete_id,
    reviews_get_id,
    reviews_post,
    reviews_put_id
  }