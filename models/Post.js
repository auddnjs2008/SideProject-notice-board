import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  name: {
    type: String,
    required: "name is required",
  },
  time: String,
  userId: String,
  imageUrl: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const model = mongoose.model("Post", PostSchema);

export default model;
