// utils/math.js
function add(a, b) {
  return a + b;
}

function getUser() {
  return { id: 1, name: "Duong" };
}

function isPositive(num) {
  return num > 0;
}

function getNullValue() {
  return null;
}

function getFruits() {
  return ["apple", "banana", "mango"];
}

module.exports = { add, getUser, isPositive, getNullValue, getFruits };
