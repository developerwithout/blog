const router = require('express').Router();
const Products = require('./products.controller')
const { isLoggedIn, isAdmin } = require('../../middleware/verifyAuthToken.js')

router.get("/category/:category/search/:query", Products.searchCategory);
router.get('/category/:category', Products.getByCategory);
router.get('/search/:query', Products.search)
router.get('/bestsellers', Products.getBestsellers);
router.get("/:id", Products.getById);
router.get("/", Products.getAll);

// Admin Routes
router.use(isLoggedIn);
router.use(isAdmin);
router.get("/admin", Products.admin.getProducts);
router.delete("/admin/:id", Products.admin.deleteProduct);
router.delete("/admin/image/:imagePath/:productId", Products.admin.deleteProductImage);
router.put("/admin/:id", Products.admin.updateProduct);
router.post("/admin/upload", Products.admin.uploadProductImage);
router.post("/admin", Products.admin.createProduct);

module.exports = router;