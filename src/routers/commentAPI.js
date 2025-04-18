import express from "express";
import CommentController from "../controllers/commentController.js";
const commentAPI = express.Router();

commentAPI.post("/comment", CommentController.createComment);
commentAPI.get("/comment", CommentController.getAll);

export default commentAPI;
