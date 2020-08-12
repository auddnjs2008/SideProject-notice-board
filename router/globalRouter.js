import express from "express";
import routes from "../routes";
import {
  home,
  logout,
  search,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  naverLogin,
  postNaverLogin,
} from "../controller/globalController";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubcallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.naver, naverLogin);

globalRouter.get(
  routes.navercallback,
  passport.authenticate("naver", {
    failureRedirect: "/login",
  }),
  postNaverLogin
);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
