const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController')

router
  .route("/:id")
  .get(productController.products_get_id)
  .put(productController.products_put_id)
  .delete(productController.products_delete_id);

router
  .route("")
  .get(productController.products_get)
  .post(productController.products_post);

module.exports = router;
