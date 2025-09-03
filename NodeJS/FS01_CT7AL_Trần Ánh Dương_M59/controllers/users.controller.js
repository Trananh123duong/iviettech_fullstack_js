const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const { Users } = require('../models');
const { BadRequestError } = require('../utils/ApiError');

const register = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    throw new BadRequestError('Vui lòng cung cấp fullName, username, email và password');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Users.create({
    fullName,
    username,
    email,
    hash_pwd: hashedPassword,
  });

  const plain = user.toJSON();
  delete plain.hash_pwd;

  res.status(201).json(plain);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ['hash_pwd'] }
  });

  if (!users || users.length === 0) {
    throw new NotFoundError('Không có user nào');
  }

  res.json(users);
});

module.exports = {
  register,
  getAllUsers
};
