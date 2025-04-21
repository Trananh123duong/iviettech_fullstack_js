function $(id) {
  return document.getElementById(id);
}

let buttonOpen = $("buttonOpen");
console.log("🚀 ~ buttonOpen:", buttonOpen)
let buttonClose = $("buttonClose");
console.log("🚀 ~ buttonClose:", buttonClose)
let menu = $("menu");

function clickButton() {
  menu.classList.toggle("active");
}

buttonOpen.onclick = clickButton;
buttonClose.onclick = clickButton;