import express from "express";
import uploadImageController from "../controllers/uploadImageController";
const uploadImageAPI = express.Router();

uploadImageAPI.post("/upload-image", uploadImageController.createImage);
export default uploadImageAPI;
