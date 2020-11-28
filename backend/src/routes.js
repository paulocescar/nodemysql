const express = require('express');

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');

const {verifyJWT} = require('./middleware');

const routes = express.Router();

routes.get('/users', verifyJWT, UserController.index);
routes.post('/users', verifyJWT, UserController.store);

routes.post('/logout', UserController.logout);
routes.post('/login', UserController.login);

routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

module.exports = routes;