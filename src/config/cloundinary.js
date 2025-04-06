import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLD_CLOUD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
});

const uploadImage = async (imagePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      folder: "product_images",
    });
    return uploadResult.secure_url;
  } catch (error) {
    throw error;
  }
};

export default uploadImage;
