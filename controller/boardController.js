import routes from "../routes";

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  const {
    body: { title, description },
  } = req;

  res.redirect(routes.postDetail(1111111));
};

export const editPost = (req, res) =>
  res.render("editPost", { pageTitle: "Edit-Post" });
export const deletePost = (req, res) =>
  res.render("deletePost", { pageTitle: "Delete-Post" });
export const postDetail = (req, res) =>
  res.render("postDetail", { pageTitle: "Post-Detail" });
