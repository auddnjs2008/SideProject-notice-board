import { initSockets } from "./socket";
import { getSocket } from "./socket";

const header = document.querySelector(".header__column");
const LogIn = document.querySelector(".logout");
const LogOut = document.querySelector(".user");
const chates = document.querySelector(".chatBox__content");
const ul = chates ? chates.querySelector("ul") : null;
const chatUser = document.querySelector(".chatUser");
const chatUl = chatUser ? chatUser.querySelector("ul") : null;
const chatBox = document.querySelector(".chatBox");

let socket = null;
const alarmLogin = (message) => {
  const li = document.createElement("li");
  li.innerHTML = `<div class="message">
       ${message} 
    </div>`;
  if (ul) ul.appendChild(li);
};

const appendUser = (sockets) => {
  sockets.forEach((socket) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class='chatUser__profile'> <img src=${socket.avatarUrl}> <span>${socket.name} </span> </div>`;
    if (chatUl) chatUl.appendChild(li);
  });
};

export const handleNewUser = ({ message, sockets }) => {
  alarmLogin(message);
  appendUser(sockets);
};

export const handleUserUpdate = ({ sockets, message }) => {
  if (chatUl) {
    while (chatUl.hasChildNodes()) {
      chatUl.removeChild(chatUl.firstChild);
    }
  }
  if (message) alarmLogin(message);
  appendUser(sockets);
};

export const handleLogOut = (socket) => {
  socket = io("/");
  socket.on("connect", () => {
    socket.emit("LogOut");
  });
};

const handleLogin = (socket) => {
  socket = io("/");
  socket.on("connect", () => {
    socket.emit("newUser", { id: socket.id });
    initSockets(socket);
  });
};

const handleHome = (socket) => {
  socket = io("/");
  socket.on("connect", () => {
    socket.emit("seeHome");
    initSockets(socket);
  });
};
if (LogIn) {
  if (chatBox) {
    handleLogin();
  } else {
    handleHome();
  }
  LogIn.addEventListener("click", handleLogOut);
}
