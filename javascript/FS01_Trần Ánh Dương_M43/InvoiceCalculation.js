function $(id) {
  return document.getElementById(id);
}

function validation(startUp, endTerm) {
  let isValid = true;

  if (!startUp) {
    isValid = false;
    $("startUp").nextElementSibling.textContent = "Vui lòng không để trống";
    $("startUp").classList.add("error-border");
  } else if (isNaN(startUp) || !isFinite(startUp) || Number(startUp) <= 0) {
    isValid = false;
    $("startUp").nextElementSibling.textContent = "Không hợp lệ: phải là số và lớn hơn 0";
    $("startUp").classList.add("error-border");
  } else {
    $("startUp").nextElementSibling.textContent = "";
    $("startUp").classList.remove("error-border");
  }

  if (!endTerm) {
    isValid = false;
    $("endTerm").nextElementSibling.textContent = "Vui lòng không để trống";
    $("endTerm").classList.add("error-border");
  } else if (isNaN(endTerm) || !isFinite(endTerm) || Number(endTerm) <= 0) {
    isValid = false;
    $("endTerm").nextElementSibling.textContent = "Không hợp lệ: phải là số và lớn hơn 0";
    $("endTerm").classList.add("error-border");
  } else {
    $("endTerm").nextElementSibling.textContent = "";
    $("endTerm").classList.remove("error-border");
  }

  if (
    isValid &&
    Number(endTerm) < Number(startUp)
  ) {
    isValid = false;
    $("endTerm").nextElementSibling.textContent = "Giá trị kết thúc không được nhỏ hơn giá trị khởi đầu";
    $("endTerm").classList.add("error-border");
  }

  return isValid;
}

function calculateBill() {
  const startUp = $("startUp").value.trim();
  const endTerm = $("endTerm").value.trim();
  let vat = $("vat").value.trim();

  const isValid = validation(startUp, endTerm);

  if (isValid) { 
    if (vat === "" || isNaN(vat) || !isFinite(vat) || Number(vat) < 0) {
      vat = 10;
    } else {
      vat = Number(vat);
    }

    let consumedKWh = endTerm - startUp
    $("numberLetters").value = consumedKWh;
  
    let total = 0;
    if (consumedKWh <= 50) {
      total = consumedKWh * 1480;
    } else if (consumedKWh <= 100) {
      total = 50 * 1480 + (consumedKWh - 50) * 1500;
    } else {
      total = 50 * 1480 + 50 * 1500 + (consumedKWh - 100) * 1800;
    }
  
    let totalWithVAT = total + (total * vat / 100);
    $("totalAmount").value = totalWithVAT.toFixed(2);
  }
}