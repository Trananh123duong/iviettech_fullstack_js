const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const { users: User } = require('../models')

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require('../utils/ApiError')

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  
  if (!name || !email || !password) {
    throw new BadRequestError('Vui lòng cung cấp name, email và password')
  }

  const existed = await User.findOne({ where: { email } })
  if (existed) {
    throw new BadRequestError('Email đã được sử dụng')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  res.status(201).json(newUser)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email: email } })
  if (!user) {
    throw new UnauthorizedError('Email hoặc mật khẩu không đúng!')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new UnauthorizedError('Email hoặc mật khẩu không đúng!')
  }
  const tokenPayload = { id: user.id, email: user.email }
  const accessToken = jwt.sign(tokenPayload, 'DUONG', { expiresIn: '1h' })

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    accessToken: accessToken
  })
})

module.exports = {
  register,
  login,
}