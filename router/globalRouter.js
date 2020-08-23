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
import { onlySecret } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubcallback,
  passport.authenticate("github", {
    failureRedirect: "/login",
    failureFlash: "Can't log in. Check email and/or Password",
    successFlash: "Welcome",
  }),
  postGithubLogin
);

globalRouter.get(routes.naver, naverLogin);

globalRouter.get(
  routes.navercallback,
  passport.authenticate("naver", {
    failureRedirect: "/login",
    failureFlash: "Can't log in. Check email and/or Password",
    successFlash: "Welcome",
  }),
  postNaverLogin
);

globalRouter.get(routes.logout, onlySecret, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
