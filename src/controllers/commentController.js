import CommentService from "../services/commentService";

const CommentController = {
  createComment: async (req, res) => {
    try {
      const { content, userId, productId, parentCommentId } = req.body;

      const newComment = {
        content,
        userId,
        productId,
        parentCommentId: parentCommentId || null,
      };

      const result = await CommentService.createComment(newComment);
      return res.status(201).json({
        EC: 0,
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        EC: 0,
        data: err,
      });
    }
  },
  getAllComment: async (req, res) => {
    try {
      const result = await CommentService.getAllComment();
      return res.status(201).json({
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
};

export default CommentController;
