const router = require('express').Router();
const Orders = require('../controllers/orders.controller');

router.get('/', Orders.getAll);

module.exports = router;