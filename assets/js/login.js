const { initSockets } = require("./chat");

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

const handleNewUser = ({ message }) => {
  alarmLogin(message);
};

if (LogIn) {
  const socket = io("/");
  socket.emit("newUser");
  initSockets(socket);
  socket.on("newUser", handleNewUser);
}
