import express from "express";
import routes from "../routes";
import { postAddCommet, postDelComment } from "../controller/boardController";

const apiRouter = express.Router();

apiRouter.post(routes.addComment, postAddCommet);
apiRouter.post(routes.delComment, postDelComment);

export default apiRouter;
