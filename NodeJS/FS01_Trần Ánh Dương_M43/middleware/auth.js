const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  // Authorization: Bearer <token> -> ['Bearer', '<token>']
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    // { id, email }
    const decoded = jwt.verify(token, 'DUONG')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = { verifyToken }