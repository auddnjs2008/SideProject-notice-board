import dotenv from "dotenv";
import "./db";
import app from "./app";
import socketIo from "socket.io";
import socketController from "./socketController";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import sharedsession from "express-socket.io-session";
import session from "express-session";
dotenv.config();

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅Listening on:http://localhost:${PORT} `);
};

const server = app.listen(PORT, handleListening);
const CokieStore = MongoStore(session);

const io = socketIo.listen(server);

io.use(
  sharedsession(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CokieStore({ mongooseConnection: mongoose.connection }),
    }),
    {
      autoSave: true,
    }
  )
);
io.on("connection", (socket) => socketController(socket, io));

export default io;
