const db = require('../config/db');

// Lấy tất cả danh mục
// const getAllCategories = async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         c.id,
//         c.name,
//         COUNT(p.id) AS product_count
//       FROM categories AS c
//       LEFT JOIN products AS p ON c.id = p.category_id
//       GROUP BY c.id, c.name
//       ORDER BY c.name ASC
//     `);
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Lỗi khi lấy danh sách danh mục:', err.message);
//     res.status(500).json({
//       message: 'Đã xảy ra lỗi khi lấy danh sách danh mục',
//       error: err.message,
//     });
//   }
// };

const getAllCategories = async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM categories')
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
}

// Lấy chi tiết danh mục theo ID
const detailCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'SELECT * FROM categories WHERE id = ?';
    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy danh mục',
      });
    }

    res.status(200).json({
      message: 'Lấy danh mục thành công',
      data: rows[0],
    });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết danh mục:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy chi tiết danh mục',
      error: error.message,
    });
  }
};

// Tạo danh mục mới
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const sql = 'INSERT INTO categories (name) VALUES (?)';
    const [result] = await db.query(sql, [name]);

    res.status(201).json({
      message: 'Tạo danh mục thành công',
      categoryId: result.insertId,
    });
  } catch (error) {
    console.error('Lỗi khi tạo danh mục:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi tạo danh mục',
      error: error.message,
    });
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const sql = 'UPDATE categories SET name = ? WHERE id = ?';
    const [result] = await db.query(sql, [name, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy danh mục để cập nhật',
      });
    }

    res.status(200).json({
      message: 'Cập nhật danh mục thành công',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật danh mục:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật danh mục',
      error: error.message,
    });
  }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM categories WHERE id = ?';
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy danh mục để xóa',
      });
    }

    res.status(200).json({
      message: 'Xóa danh mục thành công',
    });
  } catch (error) {
    console.error('Lỗi khi xóa danh mục:', error.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi xóa danh mục',
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  detailCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
