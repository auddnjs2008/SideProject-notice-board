import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./router/userRouter";
import globalRouter from "./router/globalRouter";
import boardRouter from "./router/boardRouter";
import routes from "./routes";
import { localMiddleware } from "./middleware";
const app = express();

app.set("view engine", "pug");

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.board, boardRouter);

export default app;
