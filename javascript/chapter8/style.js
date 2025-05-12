function $(id) {
  return document.getElementById(id);
}

let data = [
  {
    name: "Dương",
    email: "duong@gmail.com",
  },
  {
    name: "Nhựt",
    email: "nhut@gmail.com",
  },
];

function listData() {
  const formData = $("listData");
  let listDataHtml = "";
  data.forEach(function (item, index) {
    listDataHtml += `
      <tr>
        <td>${index + 1}</td>
        <td>
          <span id="name-span-${index}" onclick="editField(${index}, 'name')">${item.name}</span>
          <input type="text" class="form-control d-none" id="name-input-${index}" value="${item.name}">
        </td>
        <td>
          <span id="email-span-${index}" onclick="editField(${index}, 'email')">${item.email}</span>
          <input type="email" class="form-control d-none" id="email-input-${index}" value="${item.email}">
        </td>
        <td>
          <button type="button" class="btn btn-outline-success" onclick="updateData(${index}, event)">Update</button>
          <button type="button" class="btn btn-outline-danger" onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  formData.innerHTML = listDataHtml;
}
listData();

function deleteData(id) {
  data.splice(id, 1);
  listData();
}

function createData(event) {
  event.preventDefault();

  const name = $("name").value.trim();
  const email = $("email").value.trim();

  data.push({
    name: name,
    email: email
  });

  listData();

  $("name").value = "";
  $("email").value = "";
}

function editField(index, field) {
  $(`${field}-span-${index}`).classList.add('d-none');
  $(`${field}-input-${index}`).classList.remove('d-none');
}

function updateData(index, event) {
  event.preventDefault();

  const nameInput = $(`name-input-${index}`);
  const emailInput = $(`email-input-${index}`);

  const newName = nameInput.value.trim();
  const newEmail = emailInput.value.trim();

  data[index].name = newName;
  data[index].email = newEmail;

  listData();

  $("name").value = "";
  $("email").value = "";
}