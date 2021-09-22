var express = require('express');

var api = express.Router();

var ws = require('../ws/account.ws');

api.post('/:typeAccount', ws.createAccount)

module.exports = api;