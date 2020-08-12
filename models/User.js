import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  githubId: Number,
  NaverId: Number,
});

//passportLocalMongoose 적용함
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

const model = mongoose.model("User", userSchema);

export default model;
