const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

router.route("/login").post(userController.user_post_login);
router.route("/register").post(userController.user_post_register);
router.route("/forgotten").post(userController.user_post_forgotten);

router
  .route("/:id")
  .get(userController.user_get_id)
  .put(userController.user_put_id)
  .delete(userController.user_delete_id);

router.route("").get(userController.users_get);

module.exports = router;