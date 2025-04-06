import Comment from "../models/Comment.js";
import Product from "../models/Product.js";
import aqp from "api-query-params";

const CommentService = {
  createComment: async (comment) => {
    try {
      const { content, userId, rating, productId } = comment;
      const newComment = new Comment({
        content,
        userId,
        productId,
        rating,
      });

      await newComment.save();

      const product = await Product.findById(productId);

      const allComments = await Comment.find({ productId });
      const totalRating = allComments.reduce(
        (sum, comment) => sum + comment.rating,
        0
      );

      const averageRating = totalRating / allComments.length;
      product.rating = averageRating;

      await product.save();

      return newComment;
    } catch (error) {
      return error;
    }
  },
  getAllCommnet: async (queryString) => {
    try {
      const page = queryString.page;

      const { filter, limit, population } = aqp(queryString);

      let offset = (page - 1) * limit;

      delete filter.page;

      let result = await Comment.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();

      return result;
    } catch (error) {
      return error;
    }
  },
};

export default CommentService;
