const db = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// const createProduct = async (req, res) => {
//   try {
//     const { name, price,  }
//     const [rows] = await db.query('SELECT * FROM products');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Lỗi server' });
//   }
// };

module.exports = {
  getAllProducts
};