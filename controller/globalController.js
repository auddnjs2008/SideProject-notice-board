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

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const githubLogin = passport.authenticate("github", {
  failureRedirect: "/login",
  successRedirect: "/",
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      if (!user.avatarUrl) user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const { id, username } = profile;
  try {
    const user = await User.findOne({ kakaoId: id });
    if (user) return done(null, user);

    const newUser = await User.create({
      name: username,
      kakaoId: id,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const kakaoLogin = passport.authenticate("kakao", {
  failureRedirect: "/login",
  successRedirect: "/",
});

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  const postes = await Post.find({});
  const findPostes = postes.filter((post) => post.title.includes(searchingBy));
  res.render("search", { pageTitle: "Search", searchingBy, findPostes });
};
