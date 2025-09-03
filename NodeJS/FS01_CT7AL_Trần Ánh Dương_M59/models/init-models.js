var DataTypes = require("sequelize").DataTypes;
var _Articles = require("./Articles");
var _Categories = require("./Categories");
var _Users = require("./Users");

function initModels(sequelize) {
  var Articles = _Articles(sequelize, DataTypes);
  var Categories = _Categories(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Articles.belongsTo(Categories, { as: "category", foreignKey: "categoryId"});
  Categories.hasMany(Articles, { as: "Articles", foreignKey: "categoryId"});
  Articles.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Articles, { as: "Articles", foreignKey: "userId"});

  return {
    Articles,
    Categories,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
