const asyncHandler = require('express-async-handler');
const { Product, Category } = require('../models/init-models');
const { Op } = require('sequelize');
const { BadRequestError, NotFoundError } = require('../utils/ApiError');

const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort = 'id',
    order = 'asc',
    q,
  } = req.query;
  const categoryIdsRaw = req.query['categoryIds[]'];
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (categoryIdsRaw !== undefined) {
    const arr = Array.isArray(categoryIdsRaw) ? categoryIdsRaw : [categoryIdsRaw];
    const categoryIds = arr.map(Number).filter((n) => !Number.isNaN(n));
    if (categoryIds.length) {
      whereClause.category_id = { [Op.in]: categoryIds };
    }
  }
  if (q) {
    whereClause.name = { [Op.like]: `%${q}%` };
  }

  const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  const sortColumn = ['id', 'name', 'price'].includes(sort) ? sort : 'id';

  const result = await Product.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Category,
        attributes: ['id', 'name'],
      },
    ],
    order: [[sortColumn, sortOrder]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  const totalPages = Math.ceil(result.count / limit);

  res.json({
    data: result.rows,
    meta: {
      total: result.count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: totalPages,
    },
  });
});

const detailProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    include: [{
      model: Category,
      attributes: ['name'],
    }],
  });

  if (!product) {
    throw new NotFoundError('Không tìm thấy sản phẩm');
  }

  res.status(200).json({
    message: 'Lấy sản phẩm thành công',
    data: product,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    message: 'Tạo sản phẩm thành công',
    productId: newProduct,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [affectedRows] = await Product.update(req.body, {
    where: { id: id },
  });

  if (affectedRows === 0) {
    throw new NotFoundError('Không tìm thấy sản phẩm để cập nhật');
  }

  res.status(200).json({
    message: 'Cập nhật sản phẩm thành công',
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const destroyedRow = await Product.destroy({
    where: { id: id },
  });

  if (destroyedRow === 0) {
    throw new NotFoundError('Không tìm thấy sản phẩm để xóa');
  }

  res.status(200).json({
    message: 'Xóa sản phẩm thành công',
  });
});

module.exports = {
  getAllProducts,
  detailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
