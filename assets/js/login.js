import { initSockets } from "./socket";
import { getSocket } from "./socket";

const header = document.querySelector(".header__column");
const LogIn = document.querySelector(".logout");
const chates = document.querySelector(".chatBox__content");
const ul = chates ? chates.querySelector("ul") : null;
const chatUser = document.querySelector(".chatUser");
const chatUl = chatUser ? chatUser.querySelector("ul") : null;

const alarmLogin = (message) => {
  const li = document.createElement("li");
  li.innerHTML = `<div class="loginalarm">
       ${message} 
    </div>`;
  if (ul) ul.appendChild(li);
};

const appendUser = (sockets) => {
  sockets.forEach((socket) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class='chatUser__profile'> <img src=${socket.avatarUrl}> <span>${socket.name} </span> </div>`;
    chatUl.appendChild(li);
  });
};

export const handleNewUser = ({ message, sockets }) => {
  alarmLogin(message);
  appendUser(sockets);
};

export const handleUserUpdate = ({ sockets }) => {
  const childes = chatUl.getElementsByTagName("li");
  while (childes.firstChild) {
    childes.removeChild(childes.firstChild);
  }
  appendUser(sockets);
};

export const handleLogOut = (socket) => {
  console.log("logout 눌렀다");
  socket.emit("logOut");
};
if (LogIn) {
  const socket = io("/");
  socket.on("connect", () => {
    if (
      localStorage.getItem("id") === "" ||
      localStorage.getItem("id") === null
    )
      localStorage.setItem("id", socket.id);
    socket.emit("newUser", { id: socket.id });
    initSockets(socket);
    LogIn.addEventListener("click", handleLogOut(socket));
  });
}
