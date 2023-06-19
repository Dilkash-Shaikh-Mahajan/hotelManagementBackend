const express = require('express');
const router = express.Router();
const HotelBooking = require('./../models/booking.model'); // Assuming the model file is named hotelBooking.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const razorpay = new Razorpay({
	key_id: 'rzp_test_DXb4qOZFFJhsDu',
	key_secret: '6QEGux3sfiRv483wqTA2aZMH',
});
// CREATE (POST) operation
createOrder = async (req, res, next) => {
	console.log(req.body);
	// console.log(req.body.amount);
	const amount = req.body.amount; // Amount in paise
	const currency = req.body.currency; // Currency code (INR, USD, etc.)

	const options = {
		amount: amount * 100,
		currency: currency,
	};
	try {
		const order = await razorpay.orders.create(options);
		res.status(201).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error creating order');
	}
};
createBookingHotel = async (req, res, next) => {
	console.log(req.body);
	const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
		req.body;

	const body = razorpay_order_id + '|' + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac('sha256', process.env.RAZORPAY_APT_SECRET)
		.update(body.toString())
		.digest('hex');

	const isAuthentic = expectedSignature === razorpay_signature;

	console.log(req.body);
	if (isAuthentic) {
		// Database comes here
		console.log(isAuthentic);
		const {
			userName,
			mobileNumber,
			checkIn,
			checkOut,
			roomId,
			razorpay_payment_id,
		} = req.body;
		let paymentDetails = await razorpay.payments.fetch(
			razorpay_payment_id,
		);
		console.log(paymentDetails);
		// let order = await paymentSuccess.save();
		// Create a new hotel booking object
		const newBooking = new HotelBooking({
			guestUserName: userName,
			bookedUserMobileNumber: mobileNumber,
			checkInDate: checkIn,
			checkOutDate: checkOut,
			roomId: roomId,
			bookedUserEmail: paymentDetails.email,
			price: paymentDetails.amount,
			status: paymentDetails.status,
			bookedUserMobileNumber: paymentDetails.contact,
		});

		// Save the booking to the database
		newBooking
			.save()
			.then((savedBooking) => {
				res.json({ data: savedBooking, status: true });
			})
			.catch((error) => {
				res.status(500).json({
					status: false,
					error: 'An error occurred while saving the booking.',
				});
			});
	} else {
		res.status(400).json({
			success: false,
			message: 'Something went wrong while saving the booking',
		});
	}
};

// READ (GET) operation
getAllBookingHotels = async (req, res, next) => {
	// Retrieve all hotel bookings
	try {
		const allHotels = await HotelBooking.find();
		res.status(200).json({ status: true, data: allHotels });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ status: false, error: error.message });
	}
};

// UPDATE (PUT) operation

// router.put('/hotelBookings/:id', (req, res) => {
// 	const { guestName, checkInDate, checkOutDate, roomType, numberOfGuests } =
// 		req.body;
// 	const bookingId = req.params.id;

// 	// Find the booking by its ID and update its properties
// 	HotelBooking.findByIdAndUpdate(
// 		bookingId,
// 		{
// 			guestName,
// 			checkInDate,
// 			checkOutDate,
// 			roomType,
// 			numberOfGuests,
// 		},
// 		{ new: true },
// 	)
// 		.then((updatedBooking) => {
// 			res.json(updatedBooking);
// 		})
// 		.catch((error) => {
// 			res.status(500).json({
// 				error: 'An error occurred while updating the booking.',
// 			});
// 		});
// });

// DELETE operation
deleteBookingHotel = async (req, res, next) => {
	const bookingId = req.params.id;

	// Find the booking by its ID and remove it
	try {
		const deletedBooking = await HotelBooking.findByIdAndRemove(
			bookingId,
		);
		res.status(200).json({ status: true, data: deletedBooking });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ status: false, error: error.message });
	}
};

const bookingHotels = {
	createOrder,
	getAllBookingHotels,
	// getHotel,
	createBookingHotel,
	deleteBookingHotel,
	// updateHotel,
};

module.exports = bookingHotels;
