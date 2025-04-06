import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import categoryAPI from "./routers/categoryAPI.js";
import userAPI from "./routers/userAPI.js";
import productAPI from "./routers/productAPI.js";
import subCategoryAPI from "./routers/subCategory.js";
import shopAPI from "./routers/shopAPI.js";
import orderAPI from "./routers/orderAPI.js";
import uploadImageAPI from "./routers/uploadImageAPI.js";
import adminAPI from "./routers/adminAPI.js";
import commentAPI from "./routers/commentAPI.js";
import vnpayAPI from "./routers/vnpayAPI.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
  })
);

app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "ecommerdata",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

//Route
app.use("/v1/api/", categoryAPI);
app.use("/v1/api/", userAPI);
app.use("/v1/api/", productAPI);
app.use("/v1/api/", subCategoryAPI);
app.use("/v1/api/", shopAPI);
app.use("/v1/api/", orderAPI);
app.use("/v1/api/", uploadImageAPI);
app.use("/v1/api/", adminAPI);
app.use("/v1/api/", commentAPI);
app.use("/v1/api/", vnpayAPI);

app.listen(8000, () => {
  console.log(`Server is running ${8000}`);
});
