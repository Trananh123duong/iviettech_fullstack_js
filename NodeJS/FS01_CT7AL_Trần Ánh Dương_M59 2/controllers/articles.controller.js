const asyncHandler = require('express-async-handler');
const { Articles, Users, Categories } = require('../models');
const { BadRequestError, NotFoundError } = require('../utils/ApiError');

const createArticle = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { title, content, categoryId } = req.body;

  const user = await Users.findByPk(userId);
  if (!user) {
    throw new NotFoundError('User không tồn tại');
  }

  const category = await Categories.findByPk(categoryId);
  if (!category) {
    throw new NotFoundError('Category không tồn tại');
  }

  if (!title) {
    throw new BadRequestError('Vui lòng cung cấp title');
  }

  const article = await Articles.create({
    title,
    content,
    userId,
    categoryId,
  });

  res.status(201).json(article);
});

const getUserArticles = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findByPk(userId);
  if (!user) {
    throw new NotFoundError('User không tồn tại');
  }

  const articles = await Articles.findAll({
    where: { userId },
    include: [
      { model: Categories, as: 'category', attributes: ['id', 'name'] },
      { model: Users, as: 'user', attributes: ['id', 'fullName', 'username', 'email'] },
    ],
    order: [['id', 'DESC']],
  });

  res.json(articles);
});

module.exports = {
  createArticle,
  getUserArticles,
};
