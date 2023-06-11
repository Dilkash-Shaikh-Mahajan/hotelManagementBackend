const express = require('express'); //import express
// const multer = require('multer');

const router = express.Router();

const hotelController = require('../controllers/hotel.controller');
const auditoriumController = require('../controllers/auditorium.controller');
const bookingController = require('../controllers/booking.controller');
const { upload } = require('../utils/fileUpload');

// Hotels Routes
router.get('/getAllHotel', hotelController.getAllHotels);
router.get('/getHotel/:id', hotelController.getHotel);
router.post(
	'/createHotel',
	upload.fields([{ name: 'images' }, { name: 'headersImage' }]),
	hotelController.createHotel,
);
router.delete('/deleteHotel/:id', hotelController.deleteHotel);
// Hotels Routes
router.get('/getAllAuditorium', auditoriumController.getAllHotels);
router.get('/getAuditorium/:id', auditoriumController.getHotel);
router.post(
	'/createAuditorium',
	upload.fields([{ name: 'images' }, { name: 'headersImage' }]),
	auditoriumController.createHotel,
);
router.delete('/deleteAuditorium/:id', auditoriumController.deleteHotel);

// Create Order

router.post('/create-order');

// Booking Routes
router.get('/getAllBookingHotel', bookingController.getAllBookingHotels);
// router.get('/getBookedHotel/:id', hotelController.getHotel);
router.post(
	'/createBookingHotel',

	bookingController.createOrder,
);
router.delete('/deleteBookedHotel/:id', bookingController.deleteBookingHotel);

module.exports = router;
