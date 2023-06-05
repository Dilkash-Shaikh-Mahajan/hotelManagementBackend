const express = require('express'); //import express
// const multer = require('multer');

const router = express.Router();

const productController = require('../controllers/productController');
const { upload } = require('../utils/fileUpload');

// // Blog Routes
// router.get('/getAllBlogs', blogController.getAllBlogs);
// router.get('/getBlog', blogController.getBlog);
// router.get('/deleteBlog', blogController.deleteBlog);
// router.post('/createBlog', blogController.createBlog);
// router.put('/updateBlog', blogController.updateBlog);
// Category Routes
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProduct/:id', productController.getProduct);
router.post(
	'/createProduct',
	upload.single('image'),
	productController.createProduct,
);
router.delete('/deleteProduct/:id', productController.deleteProduct);
// SubCategory Routes

// // Admin routes
// router.post('/login', authController.authLogin);
// router.post('/add_admin', authController.addAdmin);

// router.post(
// 	'/CategoryDetailAdd',
// 	upload.fields([
// 		{ name: 'image', maxCount: 5 },
// 		{ name: 'snapShots', maxCount: 5 },
// 		{ name: 'featuredOneImage', maxCount: 1 },
// 		{ name: 'featuredTwoImage', maxCount: 1 },
// 		{ name: 'featuredThreeImage', maxCount: 1 },
// 	]),
// 	categoryDetailAdd.categoryDetail,
// );

module.exports = router;
