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
import { onlySecret, uploadPoster } from "../middleware";

const boardRouter = express.Router();

boardRouter.get(routes.upload, onlySecret, getUpload);
boardRouter.post(routes.upload, uploadPoster, postUpload);

boardRouter.get(routes.editPost(), onlySecret, getEditPost);
boardRouter.post(routes.editPost(), postEditPost);
boardRouter.get(routes.deletePost(), onlySecret, deletePost);

boardRouter.get(routes.postDetail(), postDetail);

export default boardRouter;
