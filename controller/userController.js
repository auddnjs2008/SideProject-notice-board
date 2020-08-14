import User from "../models/User";
import routes from "../routes";

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit-Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name },
    file,
  } = req;

  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile);
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change-Password" });

export const userDetail = (req, res) => {
  const showUser = req.user;
  res.render("userDetail", { pageTitle: "User-Detail", showUser });
};
