const { Category } = require('../models/init-models')
const { Sequelize } = require('sequelize');

const getAllCategories = async (req, res) => {
  try {
    const rows = await Category.findAll({
      attributes: [
        'id',
        'name',
      ],
      order: [['id', 'ASC']],
    })
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
}

const detailCategory = async (req, res) => {
  try {
    const { id } = req.params
    const row = await Category.findByPk(id, { attributes: ['id', 'name'] })

    if (!row) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' })
    }

    res.status(200).json({
      message: 'Lấy danh mục thành công',
      data: row,
    })
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết danh mục:', error.message)
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy chi tiết danh mục',
      error: error.message,
    })
  }
}

const createCategory = async (req, res) => {
  try {
    const name = (req.body.name || '').trim()
    if (!name) {
      return res.status(400).json({ message: 'Tên danh mục không được để trống' })
    }

    // (tuỳ chọn) kiểm tra trùng tên
    // const existed = await Category.findOne({ where: { name } })
    // if (existed) return res.status(409).json({ message: 'Danh mục đã tồn tại' })

    const created = await Category.create({ name })

    res.status(201).json({
      message: 'Tạo danh mục thành công',
      categoryId: created.id,
    })
  } catch (error) {
    console.error('Lỗi khi tạo danh mục:', error.message)
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi tạo danh mục',
      error: error.message,
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const name = (req.body.name || '').trim()
    if (!name) {
      return res.status(400).json({ message: 'Tên danh mục không được để trống' })
    }

    const [affected] = await Category.update({ name }, { where: { id } })

    if (affected === 0) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục để cập nhật' })
    }

    res.status(200).json({ message: 'Cập nhật danh mục thành công' })
  } catch (error) {
    console.error('Lỗi khi cập nhật danh mục:', error.message)
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật danh mục',
      error: error.message,
    })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const affected = await Category.destroy({ where: { id } })

    if (affected === 0) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục để xóa' })
    }

    res.status(200).json({ message: 'Xóa danh mục thành công' })
  } catch (error) {
    console.error('Lỗi khi xóa danh mục:', error.message)
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi xóa danh mục',
      error: error.message,
    })
  }
}

module.exports = {
  getAllCategories,
  detailCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}