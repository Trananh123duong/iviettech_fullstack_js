const db = require('../config/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/init-models');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    })

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Lỗi khi register:', err.message);
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi register',
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Email hoặc mật khẩu không đúng!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Email hoặc mật khẩu không đúng!' })
    }
    const token = jwt.sign({ id: user.id, email: user.email }, 'DUONG', {
      expiresIn: '1h',
    })

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      token: token,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findByPk(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  register,
  login,
  getMyProfile
};