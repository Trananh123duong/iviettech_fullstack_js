const User = require('./users');
const Category = require('./categories');
const Product = require('./products');
const Order = require('./orders');
const OrderItem = require('./order_items');

// Thiết lập các mối quan hệ
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  User,
  Category,
  Product,
  Order,
  OrderItem,
};
