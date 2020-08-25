const menuBar = document.querySelector(".menu");
const menuItem = menuBar.querySelectorAll("a");

const handleMouseover = () => {
  if (menuBar.offsetWidth >= 90) menuItem[0].classList.remove("none");
  if (menuBar.offsetWidth >= 200) menuItem[1].classList.remove("none");
};

const repeatMouseover = () => {
  setInterval(handleMouseover, 10);
};

const handleMouseLeave = () => {
  menuItem.forEach((menu) => menu.classList.add("none"));
};

const init = () => {
  menuBar.addEventListener("mouseover", repeatMouseover);
  menuBar.addEventListener("mouseleave", handleMouseLeave);
};
init();
