import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    role: {
      type: Number,
      default: 1, // 1: user- 2: seller -3 :admin
    },
  },
  { timestamps: true }
);
userSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const User = mongoose.model("User", userSchema);

export default User;
