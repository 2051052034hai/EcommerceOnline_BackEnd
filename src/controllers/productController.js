import productService from "../services/productService";
import uploadImage from "../config/cloundinary";
import { uploadSingleFile, uploadMultipleFiles } from "../services/fileService";

const productController = {
  postCreateProduct: async (req, res) => {
    try {
      const {
        title,
        description,
        subcategory,
        price,
        discountPercentage,
        rating,
        stock,
        shop,
        like,
        sold,
      } = req.body;
      const { thumbnail, images } = req.files;
      let mainImage = "";
      const additionalImageUrls = [];
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      } else {
        let imagethumb = await uploadSingleFile(thumbnail);
        mainImage = await uploadImage(imagethumb.path);
        let arrayImage = await uploadMultipleFiles(images);

        // kiểm tra nếu có phần tử thì map qua và lưu vào cloudinary
        if (arrayImage.detail.length > 0) {
          for (const item of arrayImage.detail) {
            // Tải lên hình ảnh phụ
            let itemImg = await uploadImage(item.path);

            // Thêm vào mảng
            additionalImageUrls.push(itemImg);
          }
        }
      }

      const productData = {
        title,
        description,
        thumbnail: mainImage,
        price,
        subcategory,
        shop,
        discountPercentage,
        rating,
        stock,
        images: additionalImageUrls,
        like,
        sold,
      };

      try {
        const product = await productService.createProduct(productData);
        return res.status(201).json({
          EC: 0,
          data: product,
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return error;
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const { result, total } = await productService.getProducts(req.query);
      return res.status(200).json({
        EC: 0,
        total: total,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      let result = await productService.getProductById(id, req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  getProductTopSale: async (req, res) => {
    try {
      const result = await productService.getProductTopSale();
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  putUpddateProduct: async (req, res) => {
    try {
      const product = await productService.updateProduct(req.body);
      return res.status(201).json({
        EC: 0,
        data: product,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default productController;
