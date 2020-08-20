import axios from "axios";
const wrapperBox = document.querySelector(".replies__wrapperBox");
const commentWrapper = wrapperBox.querySelectorAll(".comment-wrapper");

const delComment = (target) => {
  wrapperBox.removeChild(target);
};

const postDelAxios = async (target) => {
  const id = window.location.href.split("board/")[1];
  const value = target.querySelector("button").value;
  const sendMessage = await axios({
    method: "post",
    url: `/api/${id}/comment/del`,
    data: {
      value,
    },
  });
  if (sendMessage.status === 200) {
    delComment(target);
  }
};

const handleDelete = (e) => {
  const target = e.target.parentNode;
  postDelAxios(target);
};

const init = () => {
  commentWrapper.forEach((comment) => {
    const delBtn = comment.querySelector("button");
    delBtn.addEventListener("click", handleDelete);
  });
};

init();
