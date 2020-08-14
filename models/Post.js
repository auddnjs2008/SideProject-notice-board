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
  userId: String,
});

const model = mongoose.model("Post", PostSchema);

export default model;
