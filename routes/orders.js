const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController')


router.route("/:id").get(orderController.orders_get_id)
.put(orderController.orders_put_id)
.delete(orderController.orders_delete_id);


router.route("")
.post(orderController.orders_post)
.get(orderController.orders_get)

module.exports = router;