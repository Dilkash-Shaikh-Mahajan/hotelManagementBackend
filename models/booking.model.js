// Require the necessary packages
const mongoose = require('mongoose');
// Define the hotel booking schema
const hotelBookingSchema = new mongoose.Schema({
	guestUserName: {
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
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'hotel',
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
	price: {
		type: Number,
		required: true,
	},
	bookedUserEmail: {
		type: String,
		required: true,
	},
	bookedUserMobileNumber: {
		type: String,
		required: true,
	},
});

// Create the hotel booking model
const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);

// Export the model
module.exports = HotelBooking;
