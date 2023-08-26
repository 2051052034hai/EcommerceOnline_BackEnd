import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dagyf51bo",
  api_key: "782355449916747",
  api_secret: "ROUfMA6sJ6O3mdh1MtPJ-25C30c",
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
