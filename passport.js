import passport from "passport";
import GithubStrategy from "passport-github";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import routes from "./routes";
import {
  githubLoginCallback,
  naverLoginCallback,
} from "./controller/globalController";

// strategy 생성

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `http://localhost:4000${routes.githubcallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: `http://localhost:4000${routes.navercallback}`,
      svcType: 0,
    },
    naverLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
