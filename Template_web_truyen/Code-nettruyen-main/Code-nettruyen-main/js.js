function countFollow() {
    var count = document.querySelector('.body-following-content-count').textContent;
    var divEle = document.querySelector('.body-following-action');
    if(divEle.className.includes('followed'))
    {
        divEle.classList.remove('followed');
        document.querySelector('.body-following-content-count').textContent = parseInt(count) -1;
        divEle.textContent = "Theo dõi";
    }
    else {
        divEle.classList.add('followed');
        document.querySelector('.body-following-content-count').textContent = parseInt(count) +1;
        divEle.textContent = "Đã theo dõi";
    }
}


function loginAccount() {
    var loginEmail = document.getElementById("input-email").value;
    var passEmail = document.getElementById("input-password").value;
    if(loginEmail && passEmail)
    {
        var failLogin = document.querySelector('.fail-login');
        Object.assign(failLogin.style, {
            display: 'none',
        })
        var noneUser = document.querySelector('.header__navbar-user');
        Object.assign(noneUser.style, {
            display: 'none',
        })
        var nameAccount = document.querySelector('.login-name');
        nameAccount.textContent = loginEmail;
        var loggedEle = document.querySelector('.header__navbar-user-logged');
        Object.assign(loggedEle.style, {
            display: 'flex',
        })
    }
    else {
        var failLogin = document.querySelector('.fail-login');
        Object.assign(failLogin.style, {
            display: 'block',
        })
    }
}