import express from "express";
import adminController from "../controllers/adminController.js";
const adminAPI = express.Router();

adminAPI.post("/admin/login", adminController.loginAdmin);

export default adminAPI;
