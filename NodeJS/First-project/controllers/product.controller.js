const db = require('../config/db');
const { Product, Category } = require('../models/init-models');

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
  detailProduct,
  createProduct,
  updateProduct,
  deleteProduct
};