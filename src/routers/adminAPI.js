import express from "express";
import adminController from "../controllers/adminController";
const adminAPI = express.Router();

adminAPI.post("/admin/login", adminController.loginAdmin);

export default adminAPI