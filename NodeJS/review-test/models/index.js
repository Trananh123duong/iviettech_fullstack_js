const sequelize = require('../config/db')
const initModels = require('./init-models')

const models = initModels(sequelize)

// if (models.tasks) {
//   models.tasks.prototype.toJSON = function () {
//     return { ...this.get(), title: this.title }
//   }

//   Object.defineProperty(models.tasks.prototype, 'title', {
//     get() {
//       const rawValue = this.getDataValue('title')
//       console.log(rawValue);
//       return `${rawValue}123`
//     }
//   })
// }

module.exports = models