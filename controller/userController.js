import User from "../models/User";
import Post from "../models/Post";
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
    const user = await User.findById(req.user.id);
    const postes = user.postes;

    for (let i = 0; i < postes.length; i++) {
      await Post.findByIdAndUpdate(postes[i], {
        name,
      });
    }

    req.flash("success", "Profile updated");
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    console.log(error);
    req.flash("error", "Can't update Profile");
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change-Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;

  try {
    if (newPassword !== newPassword2) {
      req.flash("error", "Password don't match");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
    }
    await req.user.changePassword(oldPassword, newPassword);

    res.redirect(`/users/${routes.editProfile}`);
  } catch (error) {
    req.flash("error", "Can't change Password");
    console.log(error);
    res.redirect(`/users${routes.changePassword}`);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    const showUser = req.user;
    if (req.user === undefined) throw Error();
    res.render("userDetail", { pageTitle: "User-Detail", showUser, user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};
