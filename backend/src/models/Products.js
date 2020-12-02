const { Model, DataTypes } = require('sequelize');

class Products extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.STRING(1000),
      categoy_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10,2),
      base_price: DataTypes.DECIMAL(10,2),
      original_price: DataTypes.DECIMAL(10,2),
      status: DataTypes.ENUM('A','I'),
      amount: DataTypes.INTEGER
    }, {
      sequelize
    })    
  }

  static associate(models) {
    this.hasMany(models.Product_images, { foreignKey: 'product_id' });
  }
}

module.exports = Products;