const router = require('express').Router();
const Users = require('./users.controller');
const { isLoggedIn, isAdmin } = require('../../middleware/verifyAuthToken.js');

router.post('/register', Users.register);
router.post('/login', Users.login);

// Logged in User routes
router.use(isLoggedIn);
router.put('/profile', Users.updateProfile);
router.get('/profile/:id', Users.getProfileById);

// Logged in Admin routes
router.use(isAdmin);
router.get('/', Users.getAll);
router.get('/:id', Users.getById);

module.exports = router;