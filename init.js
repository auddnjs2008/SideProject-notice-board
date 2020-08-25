import dotenv from "dotenv";
import "./db";
import socketIo from "socket.io";
import app from "./app";
dotenv.config();

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅Listening on:http://localhost:${PORT} `);
};

const server = app.listen(PORT, handleListening);

const io = socketIo.listen(server);

let sockets = [];
io.on("connection", (socket) => sockets.push(socket.id));

setInterval(() => console.log(sockets), 1000);
