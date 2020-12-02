const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');
const Products = require('../models/Products');
const Product_images = require('../models/Product_images');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Products.init(connection);
Product_images.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Products.associate(connection.models);
Product_images.associate(connection.models);

module.exports = connection;