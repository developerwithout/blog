const router = require('express').Router();
const userRoutes = require('./users/users.routes')
const postsRoutes = require('./posts/posts.routes')
const productsRoutes = require('./products/products.routes')
const categoriesRoutes = require('./categories/categories.routes')
const ordersRoutes = require('./orders/orders.routes') 

router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;