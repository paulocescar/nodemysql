require("dotenv-safe").config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
require("dotenv-safe").config();

require('./database');

var app = express();

const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes');
app.use(routes);

app.listen(3333);