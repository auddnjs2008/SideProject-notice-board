import routes from "./routes";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeBoard";
  res.locals.routes = routes;

  res.locals.loggedUser = req.user || null;
  next();
};