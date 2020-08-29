const Body = document.querySelector(".chatBox");
const chatBody = document.querySelector(".chatBox__content");
const chatForm = document.querySelector(".chatForm");
const Input = chatForm ? chatForm.querySelector("input") : null;
const ul = chatBody ? chatBody.querySelector("ul") : null;

let socket = null;

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
  socket = aSocket;
  socket.on("newMessage", handleNewMessage);
};

const addchatMessage = (text, name, avatarUrl) => {
  const li = document.createElement("li");

  li.innerHTML =
    name !== undefined
      ? `<div class="chatWrapper">  
    <div class="profile">
        <img src=${avatarUrl} />
        <span> ${name} </span>
    </div>
    <div class="message">${text} </div>
  </div>`
      : `<div class="profile">
  <div class="message">${text} </div>
  </div>`;
  ul.appendChild(li);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const value = Input.value;
  getSocket().emit("newMessage", { message: value });
  Input.value = "";
  addchatMessage(value);
};

export const handleNewMessage = ({ message, name, avatarUrl }) => {
  addchatMessage(message, name, avatarUrl);
};

const init = () => {
  if (chatForm) chatForm.addEventListener("submit", handleSubmit);
};

init();
