const router = require('express').Router();
const Orders = require('./orders.controller');

router.get('/', Orders.getAll);

module.exports = router;