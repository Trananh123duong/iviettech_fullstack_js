const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Users } = require('../models');

const checkUserNotExists = asyncHandler(async (req, res, next) => {
  const { email, username } = req.body;

  const existed = await Users.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });

  if (existed) {
    return res.status(400).json({ message: 'User already existed' });
  }

  next();
});

module.exports = checkUserNotExists;
