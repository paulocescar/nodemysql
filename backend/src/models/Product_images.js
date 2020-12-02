const { Model, DataTypes } = require('sequelize');

class Product_images extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      sort_order: DataTypes.INTEGER,
      status: DataTypes.ENUM('A','I')
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Products, { foreignKey: 'product_id' });
  }
}

module.exports = Product_images;