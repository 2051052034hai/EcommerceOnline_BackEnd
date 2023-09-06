import uploadImage from "../config/cloundinary";
import { uploadSingleFile } from "../services/fileService";

const uploadImageController = {
  createImage: async (req, res) => {
    try {
      const { image } = req.files;
      console.log(image);

      let mainImage = "";
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      } else {
        let imagethumb = await uploadSingleFile(image);
        mainImage = await uploadImage(imagethumb.path);
      }
      return res.status(201).json({
        EC: 0,
        data: mainImage,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        error: error.message,
      });
    }
  },
};

export default uploadImageController;
