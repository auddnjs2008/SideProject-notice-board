import routes from "./routes";
import multer from "multer";
import app from "./app";

const upload = multer({ dest: "uploads/avatar/" });
export const uploadAvatar = upload.single("avatar");

const upload2 = multer({ dest: "uploads/post" });
export const uploadPoster = upload2.single("picture");

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeBoard";
  res.locals.routes = routes;
  if (req.user) app.locals.loginUser = req.user.id;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlySecret = (req, res, next) => {
  if (req.user) next();
  else res.redirect(routes.home);
};
