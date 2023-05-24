const Categories = require('./categories.controller');
const { isLoggedIn, isAdmin } = require('../middleware/verifyAuthToken')

const router = require('express').Router();

// All Access Routes
router.getAll('/', Categories.getAll);

// Admin Routes
router.use(isLoggedIn);
router.use(isAdmin);
router.post('/', Categories.admin.saveCategory);
router.delete('/:category', Categories.admin.deleteOne);
router.patch('/attr', Categories.admin.saveAttribute);

module.exports = router;