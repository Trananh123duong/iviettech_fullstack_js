function $(id) {
  return document.getElementById(id);
}

let buttonOpen = $("buttonOpen");
let buttonClose = $("buttonClose");
let menu = $("menu");

function clickButton() {
  menu.classList.toggle("active");
}

buttonOpen.onclick = clickButton;
buttonClose.onclick = clickButton;