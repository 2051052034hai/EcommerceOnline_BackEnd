import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    ancestors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    replies: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
        },
        ancestors: [
          {
            type: Schema.Types.ObjectId,
            ref: "Comment",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
