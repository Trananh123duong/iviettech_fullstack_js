// controllers/user.controller.js
const path = require('path')
const asyncHandler = require('express-async-handler')

const { NotFoundError } = require('../utils/ApiError')
const { users: User, tasks: Task } = require('../models')

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const result = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Task,
        as: 'tasks'
      },
    ],
  })

  if (!result) {
    throw new NotFoundError('Không tìm thấy user')
  }

  res.json(result)
})

module.exports = {
  getUserById,
}
