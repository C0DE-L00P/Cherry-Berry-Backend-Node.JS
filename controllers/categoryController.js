const Category = require('../models/categorySchema')
const Product = require('../models/productSchema')

// -------------------- IDS

const categories_get_id = (mreq, mres) => {
  Category.findById(mreq.params.id).then((res_cat) => {
    productsFromIDs(res_cat, mres);
  });
};

const categories_put_id = (mreq, mres) => {
  Category.findByIdAndUpdate(mreq.params.id, mreq.body, function (err, docs) {
    productsFromIDs(docs, mres);
  });
};

const categories_delete_id = (mreq, mres) => {
  Category.findByIdAndDelete(mreq.params.id, function (err) {
    if (err) mres.sendStatus(404);
    else mres.sendStatus(200);
  });
};


// --------------------- General

const categories_post = (mreq, mres) => {
  //Save the data in the database
  const category = new Category(mreq.body);
  category
    .save()
    .then((res_cat) => {
      mres.json(res_cat);
    })
    .catch((err) => {
      console.log("%c Error in adding to mongo" + err, "color: red;");
    });
};

const categories_get = (mreq, mres) => {
  Category.find().then((cats) => mres.json(cats));
};


async function productsFromIDs(result, res) {//result as category

    let productsPromises = [];
  
    result.Products.forEach((proID) => {
      productsPromises.push(Product.findById(proID));
    });
  
    result.Products = await Promise.all(productsPromises);
    await res.json(result);
  }  

module.exports = {
    categories_get_id,
    categories_put_id,
    categories_delete_id,
    categories_post,
    categories_get
}