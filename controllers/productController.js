const fs = require('fs');
const path = require('path');
const Product = require('../models/products.model');

getAllProducts = async (req, res, next) => {
	try {
		try {
			const products = await Product.find();
			res.status(200).json({ status: true, data: products });
		} catch (err) {
			res.status(500).send({ status: false, message: err.message });
		}
	} catch (error) {
		return res
			.status(500)
			.send({ status: false, message: error.message });
	}
};

getProduct = async (req, res, next) => {
	const _id = req.params.id;
	console.log(_id);
	try {
		const product = await Product.findOne({ _id });
		return res.status(200).json({ status: true, data: product });
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ status: false, errors: error, msg: error.message });
	}
};
createProduct = async (req, res, next) => {
	try {
		try {
			const product = await Product.create({
				productName: req.body.productName,
				image: `${req.file.filename}`,
			});

			res.status(201).send({
				message: 'Data Uplodaded SuccessFully',
				data: product,
			});
		} catch (error) {
			return res
				.status(500)
				.send({ status: 0, message: error.message });
		}
	} catch (error) {
		return res.status(500).send({ status: 0, message: error.message });
	}
};
deleteProduct = async (req, res, next) => {
	const id = req.params.id;
	console.log(id);
	// try {
	// 	const product = await Product.findByIdAndRemove(id);

	// 	// Check if the product has an associated image
	// 	if (product.image) {
	// 		// Assuming the image path is stored in the 'image' field of the product object

	// 		// Import the required file system module

	// 		// Delete the image file using the file system module
	// 		fs.unlinkSync(product.image);
	// 	}

	// 	console.log('Product and associated image deleted');
	// 	return res.status(200).json({
	// 		status: true,
	// 		msg: 'Your post and associated image have been deleted',
	// 	});
	// } catch (error) {
	// 	console.log(error);
	// 	return res
	// 		.status(500)
	// 		.json({ status: false, errors: error, msg: error.message });
	// }
	try {
		const product = await Product.findByIdAndRemove(id);

		if (product.image) {
			const fs = require('fs');
			const path = require('path');

			const imagePath = path.join(
				__dirname,
				'..',
				'public',
				product.image,
			);

			fs.unlink(imagePath, (error) => {
				if (error) {
					console.log(error);
					return res.status(500).json({
						status: false,
						errors: error,
						msg: error.message,
					});
				}

				console.log('Product and associated image deleted');
				return res.status(200).json({
					status: true,
					msg: 'Your post and associated image have been deleted',
				});
			});
		} else {
			console.log('Product deleted');
			return res.status(200).json({
				status: true,
				msg: 'Your post has been deleted',
			});
		}
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ status: false, errors: error, msg: error.message });
	}
};

updateProduct = async (req, res, next) => {
	console.log(req.body);
	const hashedPassword = await bcrypt.hash(req.body.password, 12);

	try {
		try {
			const user = await User.create({
				email: req.body.email,
				password: hashedPassword,
				status: 1,
			});

			res.status(200).send({ message: 'Added' });
		} catch (error) {
			return res
				.status(500)
				.send({ status: 0, message: error.message });
		}
	} catch (error) {
		return res.status(500).send({ status: 0, message: error.message });
	}
};

const product = {
	getAllProducts,
	getProduct,
	createProduct,
	deleteProduct,
	updateProduct,
};

module.exports = product;
