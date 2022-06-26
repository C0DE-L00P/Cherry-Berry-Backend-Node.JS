const express = require("express");
const router = express.Router();
const reviewController = require('../controllers/reviewController')

router
  .route("/:id")
  .put(reviewController.reviews_put_id)
  .delete(reviewController.reviews_delete_id)
  .get(reviewController.reviews_get_id);


router
  .route("")
  .post(reviewController.reviews_post)
  .get(reviewController.reviews_get);

module.exports = router;
