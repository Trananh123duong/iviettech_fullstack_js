const asyncHandler = require('express-async-handler');
const { Users, Categories, Articles } = require('../models');

const seedData = asyncHandler(async (req, res) => {
  await Users.create({
    id: 1,
    fullName: "Khai Nguyen",
    username: "khainguyen",
    email: "khainguyen@gmail.com",
    hash_pwd: "faw#%@‘oaf",
  });
  await Users.create({
    id: 2,
    fullName: "Khanh Ngoc",
    username: "khanhngoc",
    email: "khanhngoc@gmail.com",
    hash_pwd: "ghawd#’[S6]@S!",
  });
  await Users.create({
    id: 3,
    fullName: "Binh Nguyen",
    username: "binhnguyen",
    email: "binhnguyen@gmail.com",
    hash_pwd: "#!gats@#af%",
  });

  await Categories.create({ id: 1, name: "Jobs" });
  await Categories.create({ id: 2, name: "Economic" });
  await Categories.create({ id: 3, name: "Travels" });

  await Articles.create({
    id: 1,
    title: "Ha Long Bay",
    content: "This is the article talk about how to travel to HaLong Bay",
    userId: 1,
    categoryId: 3,
  });
  await Articles.create({
    id: 2,
    title: "Recruit backend developer",
    content: "FPT Software is recruiting some backend developers in this month",
    userId: 2,
    categoryId: 1,
  });
  await Articles.create({
    id: 3,
    title: "Price keeps increasing",
    content: "Because fuel price keeps increasing, all goods also increase…",
    userId: 3,
    categoryId: 2,
  });

  res.json({ message: "Seed dữ liệu thành công" });
});

module.exports = { seedData };
