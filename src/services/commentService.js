import Comment from "../models/Comment";

const CommentService = {
  createComment: async (newComment) => {
    try {
      const { content, userId, productId, parentCommentId } = newComment;
      if (parentCommentId) {
        const parentComment = await Comment.findOne({ _id: parentCommentId });

        if (parentComment) {
          const newReply = {
            content: content,
            userId: userId,
            productId: productId,
          };

          parentComment.replies.push(newReply);

          await parentComment.save();

          return parentComment;
        } else {
          throw new Error("Parent comment not found");
        }
      } else {
        const result = await Comment.create(newComment);
        return result;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getAllComment: async () => {
    try {
      const result = await Comment.find({});
      return result;
    } catch (error) {
      return error;
    }
  },
};

export default CommentService;
