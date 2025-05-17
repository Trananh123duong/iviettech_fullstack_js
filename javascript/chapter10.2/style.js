function $(id) {
  return document.getElementById(id);
}

let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];

function listData() {
  const formData = $("listData");
  let listDataHtml = "";
  data.forEach(function (item, index) {
    listDataHtml += `
      <tr>
        <td>
          <span id="name-span-${index}" onclick="editField(${index}, 'name')">${item.name}</span>
          <input type="text" class="form-control d-none" id="name-input-${index}" value="${item.name}">
        </td>
        <td>
          <span id="email-span-${index}" onclick="editField(${index}, 'email')">${item.email}</span>
          <input type="email" class="form-control d-none" id="email-input-${index}" value="${item.email}">
        </td>
        <td>
          <span id="phone-span-${index}" onclick="editField(${index}, 'phone')">${item.phone}</span>
          <input type="text" class="form-control d-none" id="phone-input-${index}" value="${item.phone}">
        </td>
        <td>
          <span id="birthDate-span-${index}" onclick="editField(${index}, 'birthDate')">${item.birthDate}</span>
          <input type="text" class="form-control d-none" id="birthDate-input-${index}" value="${item.birthDate}">
        </td>
        <td>
          <button type="button" class="btn btn-outline-danger" onclick="updateData(${index})">Update</button>
          <button type="button" class="btn btn-outline-warning" onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  formData.innerHTML = listDataHtml;
}
listData();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const birthDateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

function validation(name, email, phone, birthDate) {
  let isValid = true;

  if (!name) {
    isValid = false;
    $("name").nextElementSibling.textContent = "Vui lòng nhập họ và tên";
    $("name").classList.add("error-border");
  } else if (name.length < 6 || name.length > 36) {
    isValid = false;
    $("name").nextElementSibling.textContent = "Họ và tên phải từ 6 đến 32 ký tự";
    $("name").classList.add("error-border");
  } else {
    $("name").nextElementSibling.textContent = "";
    $("name").classList.remove("error-border");
  }

  if (!email) {
    isValid = false;
    $("email").nextElementSibling.textContent = "Vui lòng nhập email";
    $("email").classList.add("error-border");
  } else if (!emailRegex.test(email)) {
    isValid = false;
    $("email").nextElementSibling.textContent = "Email không hợp lệ";
    $("email").classList.add("error-border");
  } else {
    $("email").nextElementSibling.textContent = "";
    $("email").classList.remove("error-border");
  }

  if (!phone) {
    isValid = false;
    $("phone").nextElementSibling.textContent = "Vui lòng nhập số điện thoại";
    $("phone").classList.add("error-border");
  } else if (!phoneRegex.test(phone)) {
    isValid = false;
    $("phone").nextElementSibling.textContent = "Số điện thoại phải là 10 chữ số";
    $("phone").classList.add("error-border");
  } else {
    $("phone").nextElementSibling.textContent = "";
    $("phone").classList.remove("error-border");
  }

  if (!birthDate) {
    isValid = false;
    $("birthDate").nextElementSibling.textContent = "Vui lòng nhập ngày sinh";
    $("birthDate").classList.add("error-border");
  } else if (!birthDateRegex.test(birthDate)) {
    isValid = false;
    $("birthDate").nextElementSibling.textContent = "Ngày sinh không đúng định dạng dd/mm/yyyy";
    $("birthDate").classList.add("error-border");
  } else {
    $("birthDate").nextElementSibling.textContent = "";
    $("birthDate").classList.remove("error-border");
  }

  return isValid;
}

function createData() {
  const name = $("name").value.trim();
  const email = $("email").value.trim();
  const phone = $("phone").value.trim();
  const birthDate = $("birthDate").value.trim();

  const isValid = validation(name, email, phone, birthDate);

  if (isValid) {
    data.push({
      name: name,
      email: email,
      phone: phone,
      birthDate: birthDate
    });

    localStorage.setItem('data', JSON.stringify(data));

    listData();

    $("name").value = "";
    $("email").value = "";
    $("phone").value = "";
    $("birthDate").value = "";
  }
}

function deleteData(id) {
  data.splice(id, 1);
  localStorage.setItem('data', JSON.stringify(data));
  listData();
}

function editField(index, field) {
  $(`${field}-span-${index}`).classList.add('d-none');
  $(`${field}-input-${index}`).classList.remove('d-none');
}

function updateData(index) {
  const nameInput = $(`name-input-${index}`);
  const emailInput = $(`email-input-${index}`);
  const phoneInput = $(`phone-input-${index}`);
  const birthDateInput = $(`birthDate-input-${index}`);

  const newName = nameInput.value.trim();
  const newEmail = emailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  const newBirthDate = birthDateInput.value.trim();

  data[index].name = newName;
  data[index].email = newEmail;
  data[index].phone = newPhone;
  data[index].birthDate = newBirthDate;

  localStorage.setItem('data', JSON.stringify(data));

  listData();

  $("name").value = "";
  $("email").value = "";
  $("phone").value = "";
  $("birthDate").value = "";
}

function search() {
  const keyword = $("keyword").value.trim().toLowerCase();
  
  data = data.filter(function(item) {
    const nameLower = item.name.toLowerCase();
    const emailLower = item.email.toLowerCase();
    const phoneLower = item.phone.toLowerCase();
    const birthDateLower = item.birthDate.toLowerCase();

    if (
      nameLower.indexOf(keyword) !== -1 ||
      emailLower.indexOf(keyword) !== -1 ||
      phoneLower.indexOf(keyword) !== -1 ||
      birthDateLower.indexOf(keyword) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  });

  listData();

  $("keyword").value = "";
}