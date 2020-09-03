import { getSocket } from "./socket";

const Body = document.querySelector(".chatBox");
const chatBody = document.querySelector(".chatBox__content");
const chatForm = document.querySelector(".chatForm");
const Input = chatForm ? chatForm.querySelector("input") : null;
const ul = chatBody ? chatBody.querySelector("ul") : null;
const menu = document.querySelector(".footerIcon-wrapper");

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
      : `<div class="myProfile">
  <div class="myMessage">${text} </div>
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
  if (chatForm) {
    chatForm.addEventListener("submit", handleSubmit);
    menu.style.left = "0px";
  }
};

init();
