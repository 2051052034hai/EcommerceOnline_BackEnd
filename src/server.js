import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import categoryAPI from "./routers/categoryAPI";
import userAPI from "./routers/userAPI";
import productAPI from "./routers/productAPI";
import subCategoryAPI from "./routers/subCategory";
import shopAPI from "./routers/shopAPI";
import orderAPI from "./routers/orderAPI";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

mongoose
  .connect(process.env.MONGODB_URL, {
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

app.listen(8000, () => {
  console.log(`Server is running ${8000}`);
});
