const fs = require('fs');
const path = require('path');
const Hotel = require('../models/hotel.model');

getAllHotels = async (req, res, next) => {
	try {
		try {
			const Hotels = await Hotel.find();
			res.status(200).json(Hotels);
		} catch (err) {
			res.status(500).send({ status: false, message: err.message });
		}
	} catch (error) {
		return res
			.status(500)
			.send({ status: false, message: error.message });
	}
};

getHotel = async (req, res, next) => {
	const _id = req.params.id;
	console.log(_id);
	try {
		const Hotels = await Hotel.findOne({ _id });
		return res.status(200).json({ status: true, data: Hotels });
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ status: false, errors: error, msg: error.message });
	}
};
createHotel = async (req, res, next) => {
	try {
		// console.log('I am Here');
		let fileImagesArray = [];
		let fileHeaderImages = [];
		// console.log('I am Here too');

		try {
			if (req.files && req.files.headersImage) {
				req.files.headersImage.forEach((element) => {
					fileHeaderImages.push(
						`assets/Images/${element.filename}`,
					);
				});
			}
			if (req.files && req.files.images) {
				req.files.images.forEach((element) => {
					fileImagesArray.push(
						`assets/Images/${element.filename}`,
					);
				});
			}
			const HotelData = await Hotel.create({
				headerImage: fileHeaderImages,
				title: req.body.title,
				description: req.body.description,
				address: req.body.address,
				city: req.body.city,
				images: fileImagesArray,

				price: req.body.price,
				occupancy: req.body.occupancy,
			});

			res.status(201).send({
				message: 'Data Uplodaded SuccessFully',
				data: HotelData,
			});
		} catch (error) {
			return res
				.status(500)
				.send({ status: false, message: error.message });
		}
	} catch (error) {
		return res.status(500).send({ status: 0, message: error.message });
	}
};
deleteHotel = async (req, res, next) => {
	const id = req.params.id;
	console.log(id);
	try {
		const HotelData = await Hotel.findByIdAndRemove(id);
		return res.status(200).json({
			status: true,
			msg: 'Your post and associated image have been deleted',
		});
	} catch (error) {
		console.log(error.message);
	}
	// try {
	// 	const Hotel = await Hotel.findByIdAndRemove(id);

	// 	// Check if the Hotel has an associated image
	// 	if (Hotel.image) {
	// 		// Assuming the image path is stored in the 'image' field of the Hotel object

	// 		// Import the required file system module

	// 		// Delete the image file using the file system module
	// 		fs.unlinkSync(Hotel.image);
	// 	}

	// 	console.log('Hotel and associated image deleted');
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
	// try {
	// 	const HotelData = await Hotel.findByIdAndRemove(id);
	// 	console.log(HotelData);
	// 	if (HotelData.headerImage) {
	// 		const fs = require('fs');
	// 		const path = require('path');

	// 		const imagePath = path.join(
	// 			__dirname,
	// 			'..',
	// 			'public',
	// 			Hotel.headerImage[0],
	// 		);

	// 		fs.unlink(imagePath, (error) => {
	// 			if (error) {
	// 				console.log(error);
	// 				return res.status(500).json({
	// 					status: false,
	// 					errors: error,
	// 					msg: error.message,
	// 				});
	// 			}

	// 			console.log('Hotel and associated image deleted');
	// 			return res.status(200).json({
	// 				status: true,
	// 				msg: 'Your post and associated image have been deleted',
	// 			});
	// 		});
	// 	} else {
	// 		console.log('Hotel deleted');
	// 		return res.status(200).json({
	// 			status: true,
	// 			msg: 'Your post has been deleted',
	// 		});
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// 	return res
	// 		.status(500)
	// 		.json({ status: false, errors: error, msg: error.message });
	// }
};

updateHotel = async (req, res, next) => {
	console.log(req.body);
	const { roomId } = req.params;
	try {
		const room = await Hotel.findById(roomId);
		if (!room) {
			return res.status(404).json({ error: 'Room not found' });
		}
		let fileImagesArray = [];
		let fileHeaderImages = [];
		// Find the room by ID
		if (req.files && req.files.headersImage) {
			req.files.headersImage.forEach((element) => {
				fileHeaderImages.push(
					`assets/Images/${element.filename}`,
				);
			});
		}
		if (req.files && req.files.images) {
			req.files.images.forEach((element) => {
				fileImagesArray.push(
					`assets/Images/${element.filename}`,
				);
			});
		}

		// Update the room fields
		room.headerImage = fileHeaderImages;
		room.title = req.body.title;
		room.description = req.body.description;
		room.address = req.body.address;
		room.city = req.body.city;
		room.images = fileImagesArray;
		room.price = req.body.price;
		room.occupancy = req.body.occupancy;

		// Save the updated room
		const updatedRoom = await room.save();

		res.json({ data: updatedRoom, status: true });
	} catch (error) {
		res.json({ error: error.message, status: true });
	}
};

const hotels = {
	getAllHotels,
	getHotel,
	createHotel,
	deleteHotel,
	updateHotel,
};

module.exports = hotels;
