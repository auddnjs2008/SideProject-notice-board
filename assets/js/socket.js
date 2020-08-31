import { handleNewUser, handleUserUpdate, handleDisconnect } from "./login";
import { handleNewMessage } from "./chat";

let socket = null;

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
  socket = aSocket;
  socket.on("newMessage", handleNewMessage);
  socket.on("newUser", handleNewUser);
  socket.on("chatUserUpdate", handleUserUpdate);
  socket.on("disconnected", handleDisconnect);
};
