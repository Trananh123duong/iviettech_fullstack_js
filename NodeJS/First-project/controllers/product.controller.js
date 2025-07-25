const db = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const sql = `
      SELECT
        products.*,
        categories.name AS category_name
      FROM
        products
      JOIN
        categories ON products.category_id = categories.id
    `;

    const [rows] = await db.query(sql);

    res.status(200).json(rows);
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

    const sql = `
      SELECT
        products.*,
        categories.name AS category_name
      FROM products
      JOIN categories ON products.category_id = categories.id
      WHERE products.id = ?
    `;
    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm',
      });
    }

    res.status(200).json({
      message: 'Lấy sản phẩm thành công',
      data: rows[0],
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
    const { name, price, categoryId } = req.body;

    const sql =
      'INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [name, price, categoryId]);

    res.status(201).json({
      message: 'Tạo sản phẩm thành công',
      productId: result.insertId,
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
    const { name, price, categoryId } = req.body;

    const sql =
      'UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?';
    const [result] = await db.query(sql, [name, price, categoryId, id]);

    if (result.affectedRows === 0) {
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

    const sql = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
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