const DataTypes = require("sequelize").DataTypes;
const _categories = require("./categories");
const _order_items = require("./order_items");
const _orders = require("./orders");
const _products = require("./products");
const _users = require("./users");

function initModels(sequelize) {
  const categories = _categories(sequelize, DataTypes);
  const order_items = _order_items(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  products.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  order_items.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order_items, { as: "order_items", foreignKey: "product_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    categories,
    order_items,
    orders,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
