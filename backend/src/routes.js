const express = require('express');
const multer = require("multer");
const multerConfig = require("./config/multer")

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const ProductsController = require('./controllers/ProductsController');


const {verifyJWT} = require('./middleware');

const routes = express.Router();


routes.get('/users', verifyJWT, UserController.index);
routes.post('/users', UserController.store);

routes.post('/logout', UserController.logout);
routes.post('/login', UserController.login);

routes.get('/products', ProductsController.index);
routes.get('/get_product', ProductsController.getone);
routes.post('/add_product', multer(multerConfig).array('photos', 12), ProductsController.store);
routes.post('/edit_product', multer(multerConfig).array('photos', 12), ProductsController.edit);

module.exports = routes;