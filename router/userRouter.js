import express from "express";
import routes from "../routes";
import {
  getEditProfile,
  postEditProfile,
  changePassword,
  userDetail,
} from "../controller/userController";
import { onlySecret, uploadAvatar } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlySecret, getEditProfile);
userRouter.post(routes.editProfile, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlySecret, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
