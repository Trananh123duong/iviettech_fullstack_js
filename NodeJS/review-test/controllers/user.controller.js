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

  res.status(200).json(result)
})

const getUserTasks = asyncHandler(async (req, res) => {
  const { id } = req.params

  const user = await User.findByPk(id, { attributes: ['id'] })
  if (!user) {
    throw new NotFoundError('Không tìm thấy user')
  }

  const tasks = await Task.findAll({
    where: { userId: id },
  })

  res.status(200).json(tasks)
})

module.exports = {
  getUserById,
  getUserTasks
}
