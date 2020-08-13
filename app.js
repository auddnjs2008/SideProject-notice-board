import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import userRouter from "./router/userRouter";
import globalRouter from "./router/globalRouter";
import boardRouter from "./router/boardRouter";
import routes from "./routes";
import "./passport";
import { localMiddleware } from "./middleware";

const app = express();

const CokieStore = MongoStore(session);

app.set("view engine", "pug");

app.use(helmet());
app.use("/static", express.static("static"));

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-eval' * "
  );
  return next();
});
app.use(express.static(__dirname + "/"));

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.board, boardRouter);

export default app;
