function $(id) {
    return document.getElementById(id);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

$("buttonRegister").onclick = function (event) {
    event.preventDefault();
    const userName = $("userName").value;
    const email = $("email").value;
    const phone = $("phone").value;

    const genderMale = document.querySelector('input[name="optradio"][value="male"]');
    const genderFemale = document.querySelector('input[name="optradio"][value="female"]');
    const genderChecked = document.querySelector('input[name="optradio"]:checked');

    let isValid = true;

    if (!userName) {
        isValid = false;
        $("userName").nextElementSibling.textContent = "Vui lòng nhập họ và tên";
        $("userName").parentElement.classList.add("has-error");
    } else if (userName.length < 6 || userName.length > 16) {
        isValid = false;
        $("userName").nextElementSibling.textContent = "Họ và tên phải từ 6 đến 32 ký tự";
        $("userName").parentElement.classList.add("has-error");
    } else {
        $("userName").nextElementSibling.textContent = "";
        $("userName").parentElement.classList.remove("has-error");
    }
    
    if (!email) {
        isValid = false;
        $("email").nextElementSibling.textContent = "Vui lòng nhập email";
        $("email").parentElement.classList.add("has-error");
    } else if (!emailRegex.test(email)) {
        isValid = false;
        $("email").nextElementSibling.textContent = "Email không hợp lệ";
        $("email").parentElement.classList.add("has-error");
    } else {
        $("email").nextElementSibling.textContent = "";
        $("email").parentElement.classList.remove("has-error");
    }

    if (!phone) {
        isValid = false;
        $("phone").nextElementSibling.textContent = "Vui lòng nhập số điện thoại";
        $("phone").parentElement.classList.add("has-error");
    } else if (!phoneRegex.test(phone)) {
        isValid = false;
        $("phone").nextElementSibling.textContent = "Số điện thoại phải là 10 chữ số";
        $("phone").parentElement.classList.add("has-error");
    } else {
        $("phone").nextElementSibling.textContent = "";
        $("phone").parentElement.classList.remove("has-error");
    }

    if (!genderChecked) {
        isValid = false;
        $("sel").nextElementSibling.textContent = "Vui lòng chọn giới tính";
        $("sel").parentElement.classList.add("has-error");
    } else {
        $("sel").nextElementSibling.textContent = "";
        $("sel").parentElement.classList.remove("has-error");
    }

    const checkbox = document.querySelector('input[name="remember"]');
    if (!checkbox.checked) {
        isValid = false;
        checkbox.parentElement.nextElementSibling.textContent = "Bạn phải đồng ý với điều khoản";
    } else {
        checkbox.parentElement.nextElementSibling.textContent = "";
    }

    if (isValid) {
        alert('Success')
    }
}