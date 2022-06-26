const FAQ = require('../models/FAQSchema')

const faq_post = (mreq, mres) => {
    let fa = new FAQ(mreq);
    fa.save().then(() => {
      mres.sendStatus(200);
    });
  }

  const faq_get = (mreq, mres) => {
    FAQ.find().then((res_faqs) => mres.json(res_faqs));
  }

  module.exports = {
    faq_get,
    faq_post,
  }