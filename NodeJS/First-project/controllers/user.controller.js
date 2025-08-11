const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { CartItem, Product, User } = require('../models/init-models');
const { BadRequestError, NotFoundError } = require('../utils/ApiError');

// GET /api/users?page=1&limit=10
const listUsers = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    offset,
    limit,
    attributes: { exclude: ['password'] },
    order: [['id', 'ASC']],
  });

  res.status(200).json({
    data: rows,
    meta: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError('User không tồn tại');

  const {
    username, email, gender, birth_date,
    oldPassword, newPassword,
  } = req.body || {};

  const isInfoUpdate =
    username !== undefined ||
    email !== undefined ||
    gender !== undefined ||
    birth_date !== undefined;

  const isPwUpdate =
    oldPassword !== undefined ||
    newPassword !== undefined;

  if (!isInfoUpdate && !isPwUpdate) {
    throw new BadRequestError('Không có dữ liệu để cập nhật');
  }

  const update = {};
  // Thông tin (nếu có)
  if (isInfoUpdate) {
    if (username !== undefined) update.username = username;
    if (email !== undefined) update.email = email;
    if (gender !== undefined) update.gender = gender;
    if (birth_date !== undefined) update.birth_date = birth_date; // 'YYYY-MM-DD'
  }

  // Đổi mật khẩu (nếu có)
  if (isPwUpdate) {
    // Phải có cả oldPassword + newPassword
    if (!oldPassword || !newPassword) {
      throw new BadRequestError('Vui lòng nhập đủ mật khẩu hiện tại và mật khẩu mới');
    }
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) throw new BadRequestError('Mật khẩu hiện tại không đúng');

    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(newPassword, salt);
  }

  try {
    await user.update(update);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw new BadRequestError('Username hoặc email đã tồn tại');
    }
    throw err;
  }

  const safe = user.toJSON();
  delete safe.password;

  res.status(200).json({ message: 'Cập nhật thành công', user: safe });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body || {};

  if (!['user', 'admin'].includes(role)) {
    throw new BadRequestError('Giá trị role không hợp lệ');
  }

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError('User không tồn tại');

  await user.update({ role });
  const safe = user.toJSON();
  delete safe.password;

  res.status(200).json({ message: 'Cập nhật role thành công', user: safe });
});

const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId, productId)

  if (!userId || !productId) {
    throw new BadRequestError('userId và productId là bắt buộc');
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFoundError('User không tồn tại');
  }

  const product = await Product.findByPk(productId);
  if (!product) {
    throw new NotFoundError('Sản phẩm không tồn tại');
  }

  const cartItem = await CartItem.findOne({
    where: { user_id: userId, product_id: productId },
  });

  let result;
  if (cartItem) {
    cartItem.quantity += 1;
    await cartItem.save();
    result = cartItem;
  } else {
    result = await CartItem.create({
      user_id: userId,
      product_id: productId,
      quantity: 1,
    });
  }

  res.status(200).json({
    message: 'Đã thêm vào giỏ hàng',
    item: result,
  });
});

module.exports = {
  listUsers,
  updateUser,
  updateUserRole,
  addToCart
};
