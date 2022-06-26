const express = require("express");
const router = express.Router();
const faqController = require('../controllers/FAQController')

router
  .route("")
  .post(faqController.faq_post)
  .get(faqController.faq_get);

module.exports = router;