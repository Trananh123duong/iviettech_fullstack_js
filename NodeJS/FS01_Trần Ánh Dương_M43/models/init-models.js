var DataTypes = require("sequelize").DataTypes;
var _tasks = require("./tasks");
var _users = require("./users");

function initModels(sequelize) {
  var tasks = _tasks(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  tasks.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(tasks, { as: "tasks", foreignKey: "userId"});

  return {
    tasks,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
