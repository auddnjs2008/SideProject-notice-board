import axios from "axios";

const form = document.querySelector(".commentForm");
const input = document.querySelector(".commentInput");
const commentBox = document.querySelector(".Comment__replies");

const handleSubmit = (event) => {
  event.preventDefault();
  const comment = input.value;
  input.value = "";
  postAxios(comment);
};

const addComment = async (comment) => {
  const ul = commentBox.querySelector("ul");
  const div = document.createElement("div");
  div.className = "comment-wrapper";
  const li = document.createElement("li");
  const button = document.createElement("button");

  li.innerText = comment;
  button.innerText = "❌";
  ul.appendChild(div);
  div.appendChild(li);
  div.appendChild(button);
};

const postAxios = async (comment) => {
  const id = window.location.href.split("board/")[1];
  const sendmessage = await axios({
    method: "post",
    url: `/api/${id}/comment`,
    data: {
      comment,
    },
  });
  if (sendmessage.status === 200) {
    addComment(comment);
  }
};

const init = () => {
  if (form) form.addEventListener("submit", handleSubmit);
};

init();
