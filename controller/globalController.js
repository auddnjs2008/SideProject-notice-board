import routes from "../routes";
import Post from "../models/Post";
import User from "../models/User";
import passport from "passport";

export const home = async (req, res) => {
  try {
    const postes = await Post.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", postes });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", postes: [] });
  }
};

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, password, password2, email },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = (req, res) => {
  const {
    body: { email, password },
  } = req;

  passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login,
    successFlash: "Welcome",
    failureFlash: "Can't login",
  });
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  res.render("search", { pageTitle: "Search", searchingBy, postes });
};
