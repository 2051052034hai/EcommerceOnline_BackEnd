import CommentService from "../services/commentService.js";

const CommentController = {
  createComment: async (req, res) => {
    try {
      const result = await CommentService.createComment(req.body);
      return res.status(201).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await CommentService.getAllCommnet(req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
};

export default CommentController;
