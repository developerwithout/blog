const router = require('express').Router();
const userRoutes = require('./users/users.routes')
const postsRoutes = require('./users/posts.routes')
const productsRoutes = require('./users/products.routes')
const categoriesRoutes = require('./users/categories.routes')
const ordersRoutes = require('./users/orders.routes') 

router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;