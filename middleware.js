import routes from "./routes";
import multer from "multer";

const upload = multer({ dest: "uploads/avatar/" });
export const uploadAvatar = upload.single("avatar");

const upload2 = multer({ dest: "uploads/post" });
export const uploadPoster = upload2.single("picture");

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeBoard";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlySecret = (req, res, next) => {
  if (req.user) next();
  else res.redirect(routes.home);
};
