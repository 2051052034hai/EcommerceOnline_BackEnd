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
import uploadImageAPI from "./routers/uploadImageAPI";
import adminAPI from "./routers/adminAPI";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "*",
    "https://www.facebook.com/plugins/customer_chat/SDK/?app_id=&attribution=biz_inbox&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dfe77721f6e2d74%26domain%3Dht-ecommerce.onrender.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fht-ecommerce.onrender.com%252Ff23c1f5efd39134%26relation%3Dparent.parent&container_width=1200&current_url=https%3A%2F%2Fht-ecommerce.onrender.com%2Flogin&event_name=chat_plugin_sdk_icon_iframe_load&is_loaded_by_facade=true&loading_time=472&local_state=%7B%22v%22%3A1%2C%22path%22%3A2%2C%22chatState%22%3A1%2C%22visibility%22%3A%22hidden%22%2C%22showUpgradePrompt%22%3A%22not_shown%22%2C%22greetingVisibility%22%3A%22hidden%22%2C%22shouldShowLoginPage%22%3Afalse%7D&locale=vi_VN&log_id=2c6d9374-ae13-432e-812a-8afcfb7d9915&page_id=130807896786032&request_time=1696155373300&sdk=joey&suppress_http_code=1",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

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
app.use("/v1/api/", uploadImageAPI);
app.use("/v1/api/", adminAPI);

app.listen(8000, () => {
  console.log(`Server is running ${8000}`);
});
