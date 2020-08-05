import express from "express";
import routes from "../routes";
import {
  upload,
  editPost,
  deletePost,
  postDetail,
} from "../controller/boardController";

const boardRouter = express.Router();

boardRouter.get(routes.upload, upload);
boardRouter.get(routes.editPost, editPost);
boardRouter.get(routes.deletePost, deletePost);
boardRouter.get(routes.postDetail, postDetail);

export default boardRouter;
