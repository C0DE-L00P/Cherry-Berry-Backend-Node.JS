require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require('helmet')

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet())

//mongo Connection
const url = process.env.DB_API_KEY;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => app.listen(process.env.PORT || 1000, () => console.log("%c Server started", "color: green;")))
  .catch((err) => console.error(`Error DB. ${err}`));

const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

const reviewsRouter = require("./routes/reviews");
app.use("/api/reviews", reviewsRouter);

const categoriesRouter = require("./routes/categories");
app.use("/api/categories", categoriesRouter);

const FAQRouter = require("./routes/FAQs");
app.use("/api/faqs", FAQRouter);

const ordersRouter = require("./routes/orders");
app.use("/api/orders", ordersRouter);

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

app.get("*",(mreq,mres)=> mres.sendStatus(404))