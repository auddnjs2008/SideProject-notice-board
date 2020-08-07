import express from "express";
import routes from "../routes";
import {
  getUpload,
  editPost,
  deletePost,
  postDetail,
  postUpload,
} from "../controller/boardController";

const boardRouter = express.Router();

boardRouter.get(routes.upload, getUpload);
boardRouter.post(routes.upload, postUpload);

boardRouter.get(routes.editPost, editPost);
boardRouter.get(routes.deletePost, deletePost);
boardRouter.get(routes.postDetail(), postDetail);

export default boardRouter;
