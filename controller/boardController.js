import routes from "../routes";
import Post from "../models/Post";

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
  } = req;

  const newPost = await Post.create({
    title,
    description,
    name: "M.W",
  });
  console.log(newPost);
  res.redirect(routes.postDetail(newPost.id));
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
    const post = await Post.findById(id);
    res.render("postDetail", { pageTitle: "post-Detail", post });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
