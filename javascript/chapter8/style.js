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
  let listData = "";
  data.forEach(function (item, index) {
    listData += `
      <tr>
        <td>${index + 1}</td>
        <td><input type="text" class="form-control" value="${item.name}" id="name-${index}"></td>
        <td><input type="email" class="form-control" value="${item.email}" id="email-${index}"></td>
        <th>
          <button type="button" class="btn btn-outline-success" onclick="updateData(${index}, event)">
            Update
          </button>
          <button type="button" class="btn btn-outline-danger" onclick="deleteData(${index})">
            Delete
          </button>
        </th>
      </tr>
    `;
  });

  formData.innerHTML = listData;
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

function updateData(index, event) {
  event.preventDefault();

  const name = $(`name-${index}`).value.trim();
  const email = $(`email-${index}`).value.trim();

  data[index].name = name;
  data[index].email = email;

  listData();

  $("name").value = "";
  $("email").value = "";
}