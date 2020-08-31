import { initSockets } from "./socket";
import { getSocket } from "./socket";

const header = document.querySelector(".header__column");
const LogIn = document.querySelector(".logout");
const chates = document.querySelector(".chatBox__content");
const ul = chates ? chates.querySelector("ul") : null;

const alarmLogin = (message) => {
  const li = document.createElement("li");
  li.innerHTML = `<div class="loginalarm">
       ${message} 
    </div>`;
  if (ul) ul.appendChild(li);
};

export const handleNewUser = ({ message, sockets }) => {
  console.log(sockets);
  alarmLogin(message);
};

export const handleUserUpdate = ({ sockets }) => {
  console.log("*******");
  console.log(sockets);
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
  });
}
