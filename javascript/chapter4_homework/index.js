function $(id) {
    return document.getElementById(id);
}

const pageLogin = $("pageLogin");
const pageRegister = $("pageRegister");
const formLogin = $("formLogin");
const formRegister = $("formRegister");
const buttonLogin = $("buttonLogin");
const buttonRegister = $("buttonRegister");

function changePageLogin () {
    if (!pageLogin.classList.contains("change")) {
        pageLogin.classList.add("change")
        pageRegister.classList.toggle("change")
    }
    if (formLogin.classList.contains("clear")) {
        formLogin.classList.toggle("clear")
        formRegister.classList.add("clear")
    }
}

function changePageRegister () {
    if (!pageRegister.classList.contains("change")) {
        pageLogin.classList.toggle("change")
        pageRegister.classList.add("change")
    }
    if (formRegister.classList.contains("clear")) {
        formRegister.classList.toggle("clear")
        formLogin.classList.add("clear")
    }
}

pageLogin.onclick = changePageLogin;
pageRegister.onclick = changePageRegister;

let userName;
let password;

buttonRegister.onclick = function (event) {
    event.preventDefault();
    const userRegister = $("userRegister").value;
    const pwdRegister = $("pwdRegister").value;
    const pwdConfirm = $("pwdConfirm").value;
    const sel = $("sel").value;

    let isValid = true;

    if (!userRegister) {
        isValid = false;
        $("userRegister").nextElementSibling.textContent = "Vui lòng nhập tên đăng nhập";
        $("userRegister").parentElement.classList.add("has-error");
    } else if (userRegister.length < 6 || userRegister.length > 16) {
        isValid = false;
        $("userRegister").nextElementSibling.textContent = "Tên đăng nhập phải từ 6 đến 16 ký tự";
        $("userRegister").parentElement.classList.add("has-error");
    } else {
        $("userRegister").nextElementSibling.textContent = "";
        $("userRegister").parentElement.classList.remove("has-error");
    }
    
    if (!pwdRegister) {
        isValid = false;
        $("pwdRegister").nextElementSibling.textContent = "Vui lòng nhập mật khẩu";
        $("pwdRegister").parentElement.classList.add("has-error");
    } else if (pwdRegister.length < 8 || pwdRegister.length > 20) {
        isValid = false;
        $("pwdRegister").nextElementSibling.textContent = "Mật khẩu phải từ 8 đến 20 ký tự";
        $("pwdRegister").parentElement.classList.add("has-error");
    } else {
        $("pwdRegister").nextElementSibling.textContent = "";
        $("pwdRegister").parentElement.classList.remove("has-error");
    }

    if (!pwdConfirm) {
        isValid = false;
        $("pwdConfirm").nextElementSibling.textContent = "Vui lòng nhập mật khẩu";
        $("pwdConfirm").parentElement.classList.add("has-error");
    } else if (pwdConfirm !== pwdRegister) {
        isValid = false;
        $("pwdConfirm").nextElementSibling.textContent = "Nhập lại đúng mật khẩu";
        $("pwdConfirm").parentElement.classList.add("has-error");
    } else {
        $("pwdConfirm").nextElementSibling.textContent = "";
        $("pwdConfirm").parentElement.classList.remove("has-error");
    }

    if (isValid) {
        userName = userRegister;
        password = pwdRegister;
        changePageLogin();
    }
}

buttonLogin.onclick = function (event) {
    event.preventDefault();
    if (!userName && !password) {
        alert("Bạn phải đăng ký trước mới được đăng nhập");
        changePageRegister();
        return;
    }

    const userLogin = $("userLogin").value;
    const pwdLogin = $("pwdLogin").value;

    let isValid = true;

    if (!userLogin) {
        isValid = false;
        $("userLogin").nextElementSibling.textContent = "Vui lòng nhập tên đăng nhập";
        $("userLogin").parentElement.classList.add("has-error");
    } else if (userLogin !== userName) {
        isValid = false;
        $("userLogin").nextElementSibling.textContent = "Nhập sai tên đăng nhập";
        $("userLogin").parentElement.classList.add("has-error");
    } else {
        $("userLogin").nextElementSibling.textContent = "";
        $("userLogin").parentElement.classList.remove("has-error");
    }
    
    if (!pwdLogin) {
        isValid = false;
        $("pwdLogin").nextElementSibling.textContent = "Vui lòng nhập mật khẩu";
        $("pwdLogin").parentElement.classList.add("has-error");
    } else if (pwdLogin !== password) {
        isValid = false;
        $("pwdLogin").nextElementSibling.textContent = "Nhập sai mật khẩu";
        $("pwdLogin").parentElement.classList.add("has-error");
    } else {
        $("pwdLogin").nextElementSibling.textContent = "";
        $("pwdRegister").parentElement.classList.remove("has-error");
    }

    if (isValid) {
        alert("Đăng nhập thành công!");
    }
};