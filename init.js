import dotenv from "dotenv";
import "./db";
import socketIo from "socket.io";
import app from "./app";
import socketController from "./socketController";
dotenv.config();

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅Listening on:http://localhost:${PORT} `);
};

const server = app.listen(PORT, handleListening);

const io = socketIo.listen(server);

io.on("connection", (socket) => socketController(socket, io));
