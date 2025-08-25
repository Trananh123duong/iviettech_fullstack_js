const path = require('path')
const { Op } = require('sequelize')
const asyncHandler = require('express-async-handler')

const { NotFoundError, BadRequestError } = require('../utils/ApiError')
const { tasks: Task } = require('../models')

const getTaskList = asyncHandler(async (req, res) => {
  const data = await Task.findAll()
  res.json(data)
})

const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const result = await Task.findByPk(id) 
  if (!result) {
    throw new NotFoundError('Không tìm thấy task')
  }

  res.json(result)
})

const createTask = asyncHandler(async (req, res) => {
  const { title, content, status, userId } = req.body

  if (!title || !userId) {
    throw new BadRequestError('Vui lòng cung cấp title và userId')
  }

  const allowedStatus = ['pending', 'in_progress', 'completed']
  const finalStatus = status && allowedStatus.includes(status) ? status : 'pending'

  const newTask = await Task.create({
    title,
    content,
    status: finalStatus,
    userId,
  })

  res.status(201).json(newTask)
})

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { title, content, status, userId } = req.body

  const task = await Task.findByPk(id)
  if (!task) {
    throw new NotFoundError('Không tìm thấy task')
  }

  if (title !== undefined) task.title = title
  if (content !== undefined) task.content = content
  if (userId !== undefined) task.userId = userId

  if (status !== undefined) {
    const allowedStatus = ['pending', 'in_progress', 'completed']
    if (!allowedStatus.includes(status)) {
      throw new BadRequestError('Trạng thái không hợp lệ')
    }
    task.status = status
  }

  await task.save()
  res.json(task)
})

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params

  const task = await Task.findByPk(id)
  if (!task) {
    throw new NotFoundError('Không tìm thấy task')
  }

  await task.destroy()
  res.json({ message: 'Xóa task thành công' })
})

module.exports = {
  getTaskList,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}
