const asyncHandler = require('express-async-handler');
const { Categories } = require('../models');
const { BadRequestError, NotFoundError } = require('../utils/ApiError');

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new BadRequestError('Vui lòng cung cấp name');
  }

  const category = await Categories.create({ name });

  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Categories.findByPk(id);
  if (!category) {
    throw new NotFoundError('Không tìm thấy category');
  }

  if (!name) {
    throw new BadRequestError('Vui lòng cung cấp name');
  }

  category.name = name;
  await category.save();

  res.json(category);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.findAll();

  res.json(categories);
});

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
};
