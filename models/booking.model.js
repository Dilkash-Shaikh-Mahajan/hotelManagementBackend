// Require the necessary packages
const mongoose = require('mongoose');
// Define the hotel booking schema
const hotelBookingSchema = new mongoose.Schema({
	guestUserId: {
		type: String,
		required: true,
	},
	checkInDate: {
		type: Date,
		required: true,
	},
	checkOutDate: {
		type: Date,
		required: true,
	},
	roomType: {
		type: String,
		required: true,
	},
	numberOfGuests: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	bookedUserEmail: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'hotel',
	},
	status: {
		type: String,
		required: true,
	},
	bookedUserMobile: {
		type: String,
		required: true,
	},
});

// Create the hotel booking model
const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);

// Export the model
module.exports = HotelBooking;
