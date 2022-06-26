const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");

// ----------------------- IDS

const orders_get_id = (mreq, mres) => {
  Order.findById(mreq.params.id)
    .then((res_order) => {
      productsFromIDs(res_order, mres);
    })
    .catch((err) => mres.sendStatus(404));
};

const orders_put_id = (mreq, mres) => {
  Order.findByIdAndUpdate(mreq.params.id, mreq.body, function (err) {
    if (err) {
      console.log(err);
      mres.sendStatus(400);
    } else {
      mres.sendStatus(200);
    }
  });
};
const orders_delete_id = (mreq, mres) => {
  Order.findByIdAndDelete(mreq.params.id, function (err, docs) {
    if (err) {
      console.log(err);
      mres.sendStatus(400);
    } else {
      mres.sendStatus(200);
    }
  });
};


// ----------------------- General

const orders_post = (mreq, mres) => {
  let order = new Order(mreq.body);
  console.log("order sent", mreq.body);
  order
    .save()
    .then((res_order) => {
      console.table("order sent", mreq.body, "order recieved", res_order);
      mres.json(res_order);
    })
    .catch((error) => {
      console.log("%c Error in saving data in mongo" + error, "color: red;");
    });
};

const orders_get = (mreq, mres) => {
  //Filter Queries

  if (mreq.query.uid != undefined || mreq.query.UID != undefined) {
    let que = mreq.query.uid || mreq.query.UID;
    Order.find({ UserInfo: que }).then((orders) => mres.json(orders));
  } else if (mreq.query.date != undefined || mreq.query.Date != undefined) {
    let que = mreq.query.date || mreq.query.Date;
    Order.find({ Date: que }).then((orders) => mres.json(orders));
  } else if (mreq.query.state != undefined || mreq.query.State != undefined) {
    let que = mreq.query.state || mreq.query.State;
    Order.find({ State: que }).then((orders) => mres.json(orders));
  } else {
    //General Get All Orders
    Order.find().then((orders) => {
      mres.json(orders);
    });
  }
};

async function productsFromIDs(result, res) {
  let productsList = [];
  let productsPromises = [];

  result.Content.forEach((proID) => {
    productsPromises.push(Product.findById(proID));
  });

  productsList = await Promise.all(productsPromises);
  result.Content = productsList;
  await res.json(result);
}

module.exports = {
    orders_get_id,
    orders_put_id,
    orders_delete_id,
    orders_post,
    orders_get,
}