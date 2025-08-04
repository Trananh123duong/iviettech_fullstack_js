const db = require('../config/db');
const { Product, Category } = require('../models/init-models');
const { Op } = require('sequelize')

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['name']
      }],
      order: [['id', 'DESC']]
    });

    res.status(200).json(products);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', err.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy danh sách sản phẩm',
      error: err.message,
    });
  }
};

const getListProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'id',
      order = 'asc',
      categoryId,
      q,
    } = req.query
    const offset = (page - 1) * limit

    let whereClause = {}
    if (categoryId) {
      const categoryArray = Array.isArray(categoryId)
        ? categoryId
        : typeof categoryId === 'string'
        ? categoryId.split(',').map(Number)
        : [Number(categoryId)]

      whereClause.category_id = {
        [Op.in]: categoryArray,
      }
    }
    if (q) {
      whereClause.name = { [Op.like]: `%${q}%` }
    }

    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
    const sortColumn = ['id', 'name', 'price'].includes(sort) ? sort : 'id'

    const result = await Product.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      // [['name', 'asc'], ['price', 'desc']] // Example of multiple sorting
      order: [[sortColumn, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    })

    const totalPages = Math.ceil(result.count / limit)

    res.json({
      data: result.rows,
      meta: {
        total: result.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: totalPages,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
}

const detailProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [{
        model: Category,
        attributes: ['name']
      }]
    })

    if (product.length === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm',
      });
    }

    res.status(200).json({
      message: 'Lấy sản phẩm thành công',
      data: product,
    });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy chi tiết sản phẩm',
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)

    res.status(201).json({
      message: 'Tạo sản phẩm thành công',
      productId: newProduct,
    });
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi tạo sản phẩm',
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [affectedRows] = await Product.update(req.body, {
      where: { id: id }
    })

    if (affectedRows === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm để cập nhật',
      });
    }

    res.status(200).json({
      message: 'Cập nhật sản phẩm thành công',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật sản phẩm',
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const destroyedRow = await Product.destroy({
      where: { id: id }
    })

    if (destroyedRow === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm để xóa',
      });
    }

    res.status(200).json({
      message: 'Xóa sản phẩm thành công',
    });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi xóa sản phẩm',
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getListProducts,
  detailProduct,
  createProduct,
  updateProduct,
  deleteProduct
};