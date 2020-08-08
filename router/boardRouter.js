import express from "express";
import routes from "../routes";
import {
  getUpload,
  postDetail,
  postUpload,
  getEditPost,
  postEditPost,
  deletePost,
} from "../controller/boardController";

const boardRouter = express.Router();

boardRouter.get(routes.upload, getUpload);
boardRouter.post(routes.upload, postUpload);

boardRouter.get(routes.editPost(), getEditPost);
boardRouter.post(routes.editPost(), postEditPost);
boardRouter.get(routes.deletePost(), deletePost);

boardRouter.get(routes.postDetail(), postDetail);

export default boardRouter;
