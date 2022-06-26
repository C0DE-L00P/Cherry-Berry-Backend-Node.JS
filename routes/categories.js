const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController')


router.route("/:id")
.get(categoryController.categories_get_id)
.put(categoryController.categories_put_id)
.delete(categoryController.categories_delete_id)


router.route("")
.post(categoryController.categories_post)
.get(categoryController.categories_get);

module.exports = router;