function $(id) {
  return document.getElementById(id);
}

const menuButton = $("menu");
const closeButton = $("close");

function toggleSidebar() {
  const sidebarElement = $("sidebar");
  const mainElement = $("main");
  if (sidebarElement.className === "sidebar-container show-sidebar") {
    sidebarElement.className = "sidebar-container";
    mainElement.className = "main-container";
  } else {
    sidebarElement.className = "sidebar-container show-sidebar";
    mainElement.className = "main-container show-sidebar";
  }
}

menuButton.onclick = toggleSidebar;
closeButton.onclick = toggleSidebar;

const submitButton = $("submitButton");
submitButton.onclick = function () {
  const userNameValue = $("userName").value;
  const passwordValue = $("password").value;
  const confirmPasswordValue = $("confirmPassword").value;

  let isValid = true;

  // Check điều kiện của các field
  if (!userNameValue) {
    isValid = false;
    $("userName").nextElementSibling.textContent =
      "Vui lòng nhập tên đăng nhập";
    $("userName").className = "error";
  } else if (userNameValue.length < 4 || userNameValue.length > 16) {
    isValid = false;
    $("userName").nextElementSibling.textContent =
      "Tên đăng nhập phải từ 4 đến 16 ký tự";
    $("userName").className = "error";
  } else {
    $("userName").nextElementSibling.textContent = "";
    $("userName").className = "";
  }
  
  if (!passwordValue) {
    isValid = false;
    $("password").nextElementSibling.textContent =
      "Vui lòng nhập mật khẩu";
    $("password").className = "error";
  } else if (passwordValue.length < 4 || passwordValue.length > 16) {
    isValid = false;
    $("password").nextElementSibling.textContent =
      "Mật khẩu phải từ 4 đến 16 ký tự";
    $("password").className = "error";
  } else {
    $("password").nextElementSibling.textContent = "";
    $("password").className = "";
  }

  if (isValid) {
    console.log("Đăng ký thành công");
  }
};
