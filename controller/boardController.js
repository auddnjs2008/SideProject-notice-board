import routes from "../routes";
import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file,
  } = req;
  try {
    const day = new Date();
    const time = `${day.getFullYear()}-${
      day.getMonth() + 1 < 10
        ? `0${day.getMonth() + 1}`
        : `${day.getMonth() + 1}`
    }-${day.getDate() < 10 ? `0${day.getDate()}` : `${day.getDate()}`}(${
      day.getHours() < 10 ? `0${day.getHours()}` : `${day.getHours()}`
    }:${
      day.getMinutes() < 10 ? `0${day.getMinutes()}` : `${day.getMinutes()}`
    })`;

    const newPost = await Post.create({
      title,
      description,
      time,
      name: req.user.name,
      userId: req.user.id,
      imageUrl: file ? file.path : "",
    });

    const uploader = await User.findById(req.user.id);
    uploader.postes.push(newPost.id);
    uploader.save();

    res.redirect(routes.postDetail(newPost.id));
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(`/board${routes.upload}`);
  }
};

export const getEditPost = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const post = await Post.findById(id);
    res.render("editPost", { pageTitle: `Edit ${post.title}`, post });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditPost = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Post.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.postDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deletePost = async (req, res) => {
  const {
    params: { id },
  } = req;
  const post = await Post.findById(id);
  try {
    await Post.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const post = await Post.findById(id).populate("comments");
    res.render("postDetail", { pageTitle: "post-Detail", post });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postAddCommet = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  try {
    if (user === undefined) throw Error();
    const post = await Post.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    post.comments.push(newComment.id);
    post.save();
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDelComment = async (req, res) => {
  const {
    body: { value },
    user,
  } = req;
  try {
    const comment = await Comment.findById(value);
    if (String(comment.creator) !== user.id) {
      throw Error();
    } else {
      await Comment.findByIdAndRemove({ _id: value });
    }
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
