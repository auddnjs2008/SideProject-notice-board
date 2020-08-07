import routes from "../routes";

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", postes });

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = (req, res, next) => {
  const {
    body: { name, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    //사용자 등록
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = (req, res) => {
  const {
    body: { name, password },
  } = req;
  res.redirect(routes.home);
};

export const logout = (req, res) => res.redirect(routes.home);

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  res.render("search", { pageTitle: "Search", searchingBy, postes });
};
