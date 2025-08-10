const asyncHandler = require('express-async-handler');
const { Category } = require('../models/init-models');
const {
  BadRequestError,
  NotFoundError,
} = require('../utils/ApiError');

const getAllCategories = asyncHandler(async (req, res) => {
  const rows = await Category.findAll({
    attributes: ['id', 'name'],
    order: [['id', 'ASC']],
  });
  res.json(rows);
});

const detailCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const row = await Category.findByPk(id, {
    attributes: ['id', 'name'],
  });
  if (!row) throw new NotFoundError('Không tìm thấy danh mục');

  res.status(200).json({
    message: 'Lấy danh mục thành công',
    data: row,
  });
});

const createCategory = asyncHandler(async (req, res) => {
  const name = (req.body.name || '').trim();
  if (!name) throw new BadRequestError('Tên danh mục không được để trống');

  const existed = await Category.findOne({ where: { name } });
  if (existed) throw new BadRequestError('Danh mục đã tồn tại');

  const created = await Category.create({ name });

  res.status(201).json({
    message: 'Tạo danh mục thành công',
    categoryId: created.id,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const name = (req.body.name || '').trim();
  if (!name) throw new BadRequestError('Tên danh mục không được để trống');

  const category = await Category.findByPk(id);
  if (!category) throw new NotFoundError('Không tìm thấy danh mục để cập nhật');

  const dup = await Category.findOne({ where: { name } });
  if (dup && dup.id !== Number(id)) {
    throw new BadRequestError('Tên danh mục đã được sử dụng');
  }

  await category.update({ name });
  res.status(200).json({ message: 'Cập nhật danh mục thành công' });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const affected = await Category.destroy({ where: { id } });
  if (affected === 0) throw new NotFoundError('Không tìm thấy danh mục để xóa');

  res.status(200).json({ message: 'Xóa danh mục thành công' });
});

module.exports = {
  getAllCategories,
  detailCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
